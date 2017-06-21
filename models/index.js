var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/timeline-api");


module.exports.LifeEvent = require("./lifeEvent.js");
