const execSync = require("child_process").execSync;

/**
 * Matrix for build
 */
const matrix = {
	phpVersions: ["7.0", "7.1", "7.2", "7.4", "8.0", "8.1"].reverse(),
	wordPressVersions: ["5.6", "5.7", "5.8", "5.9", "latest"].reverse(),
};

let tags = [];

const pushTag = (tagName, phpVersion, wordpressVersion) =>
	tags.push({ tagName, phpVersion, wordpressVersion });

/**
 * Build, tag and (optionally) push
 */
const build = ({ phpVersion, wordpressVersion, push, tagName = null }) => {
	tagName =
		tagName ?? `josh412/wp-phpunit:php-${phpVersion}-wp-${wordpressVersion}`;
	let command = `docker build -t ${tagName} . --build-arg PHP_IMAGE_TAG=${phpVersion} --build-arg WORDPRESS_VERSION=${wordpressVersion}`;
	const onError = (error) => {
		console.log({ error, command, tagName });
	};
	const options = {
		//timeout: 120,
	};
	console.log(`Building ${tagName}`);
	try {
		execSync(command, options);
		tags.push({ tagName, phpVersion, wordpressVersion });
		if (push) {
			try {
				execSync(`docker push ${tagName}`, options);
				pushTag(tagName, phpVersion, wordpressVersion);
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
const test = false;
if (test) {
	build({
		phpVersion: matrix.phpVersions[0],
		wordpressVersion: matrix.wordPressVersions[0],
		push,
	});
	const tagName = "josh412/wp-phpunit:latest";
	let phpVersion = "7.4";
	let wordpressVersion = "latest";
	//Build latest
	build({
		phpVersion,
		wordpressVersion,
		tagName,
		push,
	});
	pushTag(tagName, phpVersion, wordpressVersion);

	require("fs").writeFileSync("tags.json", JSON.stringify(tags, null, 2));
} else {
	//Build all combinations
	matrix.phpVersions.forEach((phpVersion) => {
		matrix.wordPressVersions.forEach((wordpressVersion) =>
			build({ phpVersion, wordpressVersion, push })
		);
	});
}
