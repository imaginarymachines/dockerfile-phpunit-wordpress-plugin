const execSync = require("child_process").execSync;

/**
 * Matrix for build
 */
const matrix = {
	phpVersions: ["7.0", "7.1", "7.2", "7.4", "8.0", "8.1"],
	wordPressVersions: ["5.6", "5.7", "5.8", "5.9", "latest"],
};

/**
 * Build, tag and (optionally) push
 */
const build = ({ phpVersion, wordpressVersion, push }) => {
	const tagName = `josh412/wp-phpunit:php-${phpVersion}-wp-${wordpressVersion}`;
	let command = `docker build -t ${tagName} . --build-arg PHP_IMAGE_TAG=${phpVersion} --build-arg WORDPRESS_VERSION=${wordpressVersion}`;
	const onError = (error) => {
		console.log({ error, command, tagName });
	};
	const options = {
		timeout: 120,
	};
	console.log(`Building ${tagName}`);
	try {
		let output = execSync(command, options);
		console.log({ output: output.toString(), command, tagName });
		if (push) {
			try {
				let pushOutput = execSync(`docker push ${tagName}`, options);
				console.log({ pushOutput: pushOutput.toString(), command, tagName });
				return true;
			} catch (error) {
				onError(error);
				return false;
			}
		} else {
			return true;
		}
	} catch (error) {
		onError(error);
		return false;
	}
};

//By default, only build and tag, not push
let push = false;
if (process.argv.length >= 2) {
	//node build.js --push will make this pass
	if ("--push" == process.argv[2]) {
		push = true;
	}
}

matrix.phpVersions.forEach((phpVersion) => {
	matrix.wordPressVersions.forEach((wordpressVersion) =>
		build({ phpVersion, wordpressVersion, push })
	);
});
