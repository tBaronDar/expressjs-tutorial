import express from "express";
import { Pool } from "pg";
const app = express();

app.use(express.json());

// Database configuration
const pool = new Pool({
	user: "admin",
	password: "admin123",
	host: "localhost",
	port: 5432,
	database: "mydb",
});

// Example route to get all users
app.get("/users", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Example route to create a new user
app.post("/users", async (req, res) => {
	const { name, email } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
			[name, email]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
