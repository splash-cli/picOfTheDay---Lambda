const http = require("http");

const { scraper } = require("./lib/utils");

const server = http.createServer(async (req, res) => {
	try {
		const data = await scraper();

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data, null, 2));
	} catch (error) {
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify(
				{
					error: error.message,
				},
				null,
				2,
			),
		);
	}
});

server.listen(process.env.PORT || 3000, () => {
	console.log(`Listening at: ${process.env.PORT || 3000}`);
});
