const child_process = require('child_process');
const fs = require('fs');

function exec(command) {
	return new Promise((resolve, reject) => {
		child_process.exec(command, (err, _, stderr) => {
			if (err) return reject(err);
			if (stderr) return reject(stderr);
			resolve(_);
		});
	});
}
const STATIC_FILE_DIRECTORY = 'build/static';
const REACT_DEVTOOLS_DISABLER =
	'if(typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__!=="undefined"){window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};}';
function generateMapFileURL(type, filename) {
	const CSS_MAP_FILE_URL_TEMPLATE = '/*# sourceMappingURL=::FILE_NAME::.map */';
	const JS_MAP_FILE_URL_TEMPLATE = '//# sourceMappingURL=::FILE_NAME::.map';
	if (type === 'js')
		return JS_MAP_FILE_URL_TEMPLATE.replace('::FILE_NAME::', filename);
	else if (type === 'css')
		return CSS_MAP_FILE_URL_TEMPLATE.replace('::FILE_NAME::', filename);
}
async function getMapFiles(dir) {
	return (await fs.promises.readdir(dir)).filter(
		(file) => file.split('.').pop() === 'map'
	);
}
async function getSourceFiles(dir, type) {
	return (await fs.promises.readdir(dir)).filter(
		(file) => file.split('.').pop() === type
	);
}
// Deletes all the map files with the given type.
async function deleteMapFiles(type) {
	(await getMapFiles(`${STATIC_FILE_DIRECTORY}/${type}`)).forEach(
		async (item) =>
			await fs.promises.unlink(`${STATIC_FILE_DIRECTORY}/${type}/${item}`)
	);
}
// Deletes .map URL from the file with the given type.
async function deleteMapFileURL(type) {
	(await getSourceFiles(`${STATIC_FILE_DIRECTORY}/${type}`, type)).forEach(
		async (item) => {
			const fileData = await fs.promises.readFile(
				`${STATIC_FILE_DIRECTORY}/${type}/${item}`,
				{ encoding: 'utf8' }
			);
			const data = fileData
				.replace(generateMapFileURL(type, item), '')
				.split('\n');
			if (data.length % 2 === 0) data.pop();
			await fs.promises.writeFile(
				`${STATIC_FILE_DIRECTORY}/${type}/${item}`,
				data.join('\n'),
				{ encoding: 'utf8' }
			);
		}
	);
}
async function disableReactDevTools() {
	const fileData = await fs.promises.readFile(`build/index.html`, {
		encoding: 'utf8',
	});
	await fs.promises.writeFile(
		'build/index.html',
		fileData.replace('!function(e){', `${REACT_DEVTOOLS_DISABLER}!function(e){`)
	);
}
async function main() {
	try {
		console.log('Building project...');
		await exec('npm run build');
		await deleteMapFiles('css');
		await deleteMapFiles('js');
		await deleteMapFileURL('css');
		await deleteMapFileURL('js');
		await disableReactDevTools();
		console.log('Project builded.');
	} catch (err) {
		console.error(err);
	}
}
main();
