const path = require('path')
const fs = require('fs-extra')
const { log } = require('./console')

module.exports = function getRepoPath() {
	const ubuntuPath = path.join('/', 'home', 'runner', 'work')
	const exists = fs.pathExistsSync(ubuntuPath)

	if (exists) {
		const files = fs.readdirSync(ubuntuPath)
			.filter(f => !f.startsWith('_')) // filters out [ '_PipelineMapping', '_actions', '_temp', ]

		if (files.length === 1) {
			const repo_name = files[0]
			const files2 = fs.readdirSync(path.join(ubuntuPath, repo_name))

			// path.join(ubuntuPath, repo_name, 'roam2github') == __dirname
			const withoutR2G = files2.filter(f => f != 'roam2github') // for old main.yml

			if (files2.length === 1 && files2[0] == repo_name) {

				log('Detected GitHub Actions path')
				return path.join(ubuntuPath, repo_name, repo_name) // actions/checkout@v2 outputs to path /home/runner/work/<repo_name>/<repo_name>

			} if (files2.length == 2 && withoutR2G.length == 1 && withoutR2G[0] == repo_name) {

				log('Detected GitHub Actions path found. (Old main.yml being used, with potential "roam2github" repo name conflict)')
				return path.join(ubuntuPath, repo_name, repo_name) // actions/checkout@v2 outputs to path /home/runner/work/<repo_name>/<repo_name>

			} else {
				// log(files, 'detected in', path.join(ubuntuPath, repo_name), '\nNot GitHub Action')
				log('GitHub Actions path not found. Using local path')
				return false
			}

		} else {
			// log(files, 'detected in', ubuntuPath, '\nNot GitHub Action')
			log('GitHub Actions path not found. Using local path')
			return false
		}

	} else {
		// log(ubuntuPath, 'does not exist. Not GitHub Action')
		log('GitHub Actions path not found. Using local path')
		return false
	}
}