import express from "express";
import { env } from "node:process";

// Create an express application
const app = express();

const PORT = env.PORT || 3000;
console.log(env.PORT);

// Listen on selected port
// the second argument is a callback function that is called when the server has started
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// Define a route handler for the root path
// The first argument is the path, the second argument is a callback function that is called when the route is matched
// The callback function takes two arguments: the request object and the response object
// The request object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
// The response object represents the HTTP response that an Express app sends when it gets an HTTP request.
app.get("/", (req, res) => {
	res.send("Γαμώ τα σοφτ σκιλς!");
});

app.get("/alex-kane-react", (req, res) => {
	res.send("Γαμώ τα σοφτ σκιλς!, Alex Kane React, zito o mastoras!");
});

//an other example
//manually set the status code to 200
app.get("/api/users", (req, res) => {
	res.status(200).send([
		{ id: 1, name: "John" },
		{ id: 2, name: "Jane" },
		{ id: 3, name: "Jim" },
	]);
});
