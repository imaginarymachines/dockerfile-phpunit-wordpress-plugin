const execSync = require("child_process").execSync;
const phpVersions = [7.1];

const wordPressVersions = [5.9];

const build = ({ phpVersion, wordpressVersion, tag }) => {
	const tagName = `josh412/wp-phpunit:${phpVersion}-${wordpressVersion}`;
	let command = `docker build -t ${tagName} . --build-arg PHP_IMAGE_TAG=${phpVersion} --build-arg WORDPRESS_VERSION=${wordpressVersion}`;
	const onError = (error) => {
		console.log({ error, command, tagName });
	};
	try {
		let output = execSync(command);
		console.log({ output: output.toString(), command, tagName });
		if (tag) {
			try {
				let pushOutput = execSync(`docker push ${tagName}`);
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

let push = false;
if (process.argv.length >= 2) {
	if ("--tag" == process.argv[2]) {
		push = true;
	}
}
phpVersions.forEach((phpVersion) => {
	wordPressVersions.forEach((wordpressVersion) =>
		build({ phpVersion, wordpressVersion, push })
	);
});
