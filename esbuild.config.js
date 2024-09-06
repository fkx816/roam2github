const esbuild = require('esbuild')

esbuild.build({
	entryPoints: ['src/main.js'],
	bundle: true,
	platform: 'node',
	outfile: 'backup.js',
	treeShaking: false, // Disable Tree Shaking
	external: ['path', 'fs-extra', 'dotenv', 'puppeteer', 'sanitize-filename', 'edn-formatter', 'extract-zip'] // Do not bundle these modules
}).catch(() => process.exit(1))