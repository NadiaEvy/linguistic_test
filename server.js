const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });


// Route to save memory test responses
app.post("/api/memory-test", (req, res) => {
    fs.appendFileSync("memory_test_data.json", JSON.stringify(req.body.responses) + "\n");
    res.sendStatus(200);
});

// Route to handle audio uploads
app.post("/api/upload", upload.single("audio"), (req, res) => {
    res.json({ success: true, path: `/uploads/${req.file.filename}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
app.post("/upload", upload.single("file"), (req, res) => {
    const { surveyData, phase, word, respondentId } = req.body;

    // Parse the survey data
    const survey = JSON.parse(surveyData);

    // Log or save the survey and audio information
    console.log(`Received file for respondent: ${respondentId}`);
    console.log(`Survey data: ${JSON.stringify(survey)}`);
    console.log(`Phase: ${phase}, Word: ${word}`);

    // Store the file, perhaps in a subfolder for the respondent (already handled by multer storage)
    res.status(200).send("File and survey data uploaded successfully!");
});
