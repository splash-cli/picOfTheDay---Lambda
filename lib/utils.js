const fetch = require("isomorphic-fetch");
const fs = require("fs");
const regex = /<a .*? href="\/photos\/(.*?)">.*?<\/a>.*?<a .*? href="\/(\@\w+)".*?>(.*?)<\/a>/;

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
		const [_, id, username, name] = tag.match(regex);

		if (logs_enabled) log(`Photo of the day (#${id}) by ${name} (${username})`);

		return { id, user: { username, name } };
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
