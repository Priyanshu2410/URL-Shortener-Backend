const express = require("express");
const {connect} = require("./connect");
const urlRoutes = require("./routes/url");
const URL = require("./models/url.models.js");

const app = express();

app.use(express.json());
app.use("/url", urlRoutes);

connect("mongodb://127.0.0.1:27017/linksh").then(() => {
    console.log("Connected to database");
})

.catch((err) => {
    console.log("Error connecting to database", err);
});

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHis: { timestamp: new Date() } } },
        );

        if (!entry) {
            return res.status(404).send("URL not found");
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error fetching URL from database:", error);
        res.status(500).send("Internal server error");
    }
});



app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
