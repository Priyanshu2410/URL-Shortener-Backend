const mongoose = require("mongoose");
// mongoose.set("srrictQuery", true);

async function connect(url) {
    return mongoose.connect(url);
}

module.exports = { connect};