require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const { createClient } = require('@redis/client'); // Use new client for Redis v4+

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Create and connect the Redis client
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
});

// Ensure the Redis client connects and handles errors properly
redisClient.connect()
  .then(() => {
    console.log('Redis client connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
  });

// Login API Endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user data is in Redis cache
    const cachedUser = await redisClient.get(email);

    if (cachedUser) {
      console.log("Cache hit - returning cached data");
      return res.json({ success: true, message: "Login successful!", user: JSON.parse(cachedUser) });
    }

    // If cache miss, query the database
    const result = await pool.query("SELECT * FROM user_cred WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // If passwords match, save the user data to Redis and return the response
      if (user.password === password) {
        // Cache the user data for 1 hour (3600 seconds)
        await redisClient.setEx(email, 3600, JSON.stringify(user));
        console.log("Cache miss - saving to Redis");
        return res.json({ success: true, message: "Login successful!", user });
      }
    }

    // If login fails (either wrong password or no user found)
    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error("Database or Redis error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

