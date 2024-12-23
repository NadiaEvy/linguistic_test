const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");  // Import CORS to handle cross-origin requests

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());  // Enable CORS for all domains (or configure it as needed)

// Set up storage configuration for multer (optional: define where the files are stored)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");  // Files will be saved in the "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);  // Use a timestamp to prevent filename conflicts
    }
});

const upload = multer({ storage: storage });

// Ensure the "uploads" directory exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Route to save memory test responses (if needed for survey data)
app.post("/api/memory-test", (req, res) => {
    fs.appendFileSync("memory_test_data.json", JSON.stringify(req.body.responses) + "\n");
    res.sendStatus(200);
});

// Route to handle audio uploads
app.post("/api/upload", upload.single("audio"), (req, res) => {
    // After file is uploaded, return the file path as a response
    if (req.file) {
        console.log(`File uploaded: ${req.file.filename}`);
        res.json({ success: true, path: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: "No file uploaded" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
