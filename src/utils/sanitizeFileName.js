const sanitize = require('sanitize-filename');

module.exports = function sanitizeFileName(fileName, md_replacement) {
	fileName = fileName.replace(/\//g, '／')

	const sanitized = sanitize(fileName, { replacement: md_replacement })

	if (sanitized != fileName) {

		// log('    Sanitized:', fileName, '\n                                       to:', sanitized)
		return sanitized

	} else return fileName
}