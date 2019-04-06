const fetch = require("isomorphic-fetch");
const regex = /<a .*? href="\/photos\/(.*?)">.*?<\/a>.*?<a .*? href="\/(\@\w+)".*?>(.*?)<\/a>/;
const http = require("http");

const server = http.createServer((req, res) => {
	fetch("https://unsplash.com")
		.then((response) => response.text())
		.then((html) => {
			let tags = html.match(/<a .*?><(.*?)<\/a>/gi);
			let tag = tags.find((tag) => /Photo of the day/gi.test(tag));
			const [_, id, username, name] = tag.match(regex);

			res.writeHead(200, { "Content-Type": "application/json" });
			res.end({ id, user: { username, name } }, null, 2);
		})
		.catch((error) => {
			console.error(error.message);

			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: error.message }, null, 2));
		});
});

server.listen(process.env.PORT || 3000, () => {
	console.log(`Listening at: ${process.env.PORT || 3000}`);
});
