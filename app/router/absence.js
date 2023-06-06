const express = require("express");
const route = express.Router();
const absenceController = require("../api/absence");
const verifyJwtToken = require("../api/verifyJwtToken");

route.get("/", absenceController.getAbsen);
route.post("/checkin", [verifyJwtToken.verifyToken], absenceController.checkin);

module.exports = route;
