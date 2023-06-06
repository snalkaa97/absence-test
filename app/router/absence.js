const express = require("express");
const route = express.Router();
const absenceController = require("../api/absence");
const absence = require("../api/absence");

route.get("/", absenceController.getAbsen);
route.post("/checkin", absenceController.checkin);

module.exports = route;
