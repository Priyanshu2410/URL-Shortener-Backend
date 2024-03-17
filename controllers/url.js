const shortid = require("shortid");
const URL = require("../models/url.models");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ message: "Redirect URL is required" });
  }
  const shortId = shortid(8);
  await URL.create({ shortId : shortId, redirectURL: body.url,visitHis: [] });

    return res.status(201).json({ shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json(
    {
      totalVisits: result.visitHis.length,
      analytics : result.visitHis
    }
  )
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
    };
