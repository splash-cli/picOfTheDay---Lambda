const fetch = require("isomorphic-fetch");
const fs = require("fs");
const regex = /<a .*? href="\/photos\/(.*?)">.*?<\/a>/;

const log = (message) => {
	const date = new Date();

	const logDate = date.toISOString();

	fs.appendFileSync(__dirname + "/logs.txt", `\n[${logDate}] | ${message}`);
};

const scraper = async (logs_enabled = true) => {
	if (logs_enabled) log("Making a new request");

	try {
		const response = await fetch("https://unsplash.com");
		if (!response.ok) return false;

		const html = await response.text();

		let tags = html.match(/<a .*?><(.*?)<\/a>/gi);
		let tag = tags.find((tag) => /Photo of the day/gi.test(tag));

		if (tag) {
			const [_, id] = tag.match(regex);
			return { id };
		}

		return {};
	} catch (error) {
		if (logs_enabled) {
			log("Request failed");
			log(`${JSON.stringify(error, null, 2)}`);
		}

		console.error(error);
		return error;
	}
};

module.exports.scraper = scraper;
module.exports.log = log;
