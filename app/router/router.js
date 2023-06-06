const verifySignUpController = require("../api").verifySignUp;
const verifySignController = require("../api").verifySign;
const verifyJwtTokenController = require("../api").verifyJwtToken;

const bankRoute = require("./bank");
const absenceRoute = require("./absence");
const express = require("express");
const route = express.Router();

route.post(
	"/api/auth/signup",
	[verifySignUpController.checkDuplicateUserNameOrEmail],
	verifySignController.signup
);
route.post("/api/auth/signin", verifySignController.signin);

route.post(
	"/api/auth/verifyToken",
	[verifyJwtTokenController.verifyToken],
	(req, res) => {
		res.status(200).send({ verifyToken: true });
	}
);

route.get("/", (req, res) => {
	res.status(200).send({
		message: "welcome to absence app",
	});
});

//bank
route.use("/api/bank", bankRoute);
//absence
route.use("/api/absence", absenceRoute);

module.exports = route;
