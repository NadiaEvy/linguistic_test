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
