const express = require("express");
//const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
//app.use(express.json());
//
//app.use(cors);
app.use(express.json());
let headlines = [];
app.get("/getData", (req, res) => {
	res.json(headlines);
});

// title.title  for headlines
// location.uri  for headlines url

app.get("/getCall", (req, res) => {});
const getHeadlines = async () => {
	try {
		const data = {
			queryString: "",
			resultContext: {
				aspects: [
					"title",
					"lifecycle",
					"location",
					"summary",
					"editorial",
					"images",
				],
			},
		};

		const url = "https://api.ft.com/content/search/v1";

		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.

			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": "59cbaf20e3e06d3565778e7b9758f7892e89468293a48663b98bd1d9",
			},
			body: JSON.stringify(data),
		});
		const num = await response.json();
		headlines = num.results[0].results;
		headlines.forEach((element) => {});
		
	} catch (error) {
		
	}
};

getHeadlines();

const port = process.env.PORT || 3004;
const listener = app.listen(port, function () {
	console.log("server is listtening to the port: " + listener.address().port);
});
