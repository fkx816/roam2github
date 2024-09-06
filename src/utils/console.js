
/**
 * console.log() with timestamp and 'R2G' prefix
 * @param  {...any} messages
 * @returns void
 */
function log(...messages) {
	const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '')
	console.log(timestamp, 'R2G', ...messages)
}

/**
 * console.error() with timestamp and 'R2G' prefix and exits process
 * @param {any} err
 * @returns void
 */
async function error(err) {
	log('ERROR -', err)
	console.timeEnd('R2G Exit after')
	// await page.screenshot({ path: path.join(download_dir, 'error.png' }) // will need to pass page as parameter... or set as parent scope
	process.exit(1)
}

module.exports = {
	log,
	error,
}