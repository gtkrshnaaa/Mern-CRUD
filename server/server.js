// mern/server/server.js

require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const connectDatabase = require("./db/conn");

// Call the connectDatabase function and pass the startServer function as a callback
connectDatabase((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        // Database connection successful, start the server
        startServer();
    }
});