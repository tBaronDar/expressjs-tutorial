import e from "express";
import express from "express";
import { env } from "node:process";

// Create an express application
const app = express();

const PORT = env.PORT || 3000;
console.log(env.PORT);

const mockUsers = [
	{ id: 1, name: "John", age: 30 },
	{ id: 2, name: "Jane", age: 25 },
	{ id: 3, name: "Jim", age: 35 },
	{ id: 4, name: "Jake", age: 28 },
	{ id: 5, name: "Jill", age: 32 },
];

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
app.get("/api/my-users", (req, res) => {
	res.status(200).send(mockUsers);
});

//Route with a parameter
app.get("/api/users/:id", (req, res) => {
	console.log(req.params);
	const userId = parseInt(req.params.id, -1); //if parseInt fails it returns -1
	//alt way to check if it's a number isNaN(userId)
	if (userId === -1) {
		res.status(400).send({ message: "Invalid user id" });
		return;
	}
	const user = mockUsers.find((u) => u.id === userId);
	if (user) {
		res.status(200).send(user);
	} else {
		res.status(404).send({ message: "User not found" });
	}
});

//query parameters
app.get("/api/users", (req, res) => {
	//here we expect two query parameters: filter and ageLimit
	//example: /api/users?filter=age&ageLimit=30
	//we will return all users with age greater than or equal to 30
	//if the query parameters are invalid we will return a 400 status code
	//if no users are found we will return an empty array
	console.log(req.query);
	const { filter, ageLimit } = req.query;
	if (filter && ageLimit) {
		const parsedAgeLimit = parseInt(ageLimit);
		if (
			typeof filter !== "string" ||
			isNaN(parsedAgeLimit) ||
			parsedAgeLimit < 0
		) {
			res.status(400).send({ message: "Invalid query parameters" });
			return;
		}
		//filter users by age
		if (filter !== "age") {
			const filteredUsers = mockUsers.filter(
				(user) => user.age >= parsedAgeLimit
			);
			res.status(200).send(filteredUsers);
		} else if (filter === "name") {
			//here we could fileter by some other criteria..
		}
	} else {
		//if no query parameters are provided return all users
		res.status(200).send(mockUsers);
	}
});
