const express = require("express");
const route = express.Router();
const bankController = require("../api/bank");
const verifyJwtTokenController = require("../api").verifyJwtToken;

route.get("/test", (req, res) => {
	res.status(200).send({
		message: "Test api bank successful",
	});
});
route.get("/", [verifyJwtTokenController.verifyToken], bankController.getAll);
route.post("/", [verifyJwtTokenController.verifyToken], bankController.create);

route.put(
	"/:id",
	[verifyJwtTokenController.verifyToken],
	bankController.update
);

route.delete(
	"/:id",
	[verifyJwtTokenController.verifyToken],
	bankController.delete
);

module.exports = route;
