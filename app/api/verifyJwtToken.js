const jwt = require("jsonwebtoken");
const config = require("../config/configRoles.js");
const Karyawan = require("../models").Karyawan;
module.exports = {
	verifyToken(req, res, next) {
		let tokenHeader = req.headers["authorization"];
		if (tokenHeader == undefined) {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Token Invalid or Null",
			});
		}

		if (tokenHeader.split(" ")[0] !== "Bearer") {
			return res.status(500).send({
				auth: false,
				message: "Incorrect token format",
				errors: "Incorrect token format",
			});
		}

		let token = tokenHeader.split(" ")[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "No token provided",
				errors: "No token provided",
			});
		}

		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: err,
					errors: err,
				});
			}
			req.karyawanId = parseInt(decoded.id);
			const karyawan = await Karyawan.findOne({
				attributes: ["id", "name", "email", "password"],
				where: {
					id: decoded.id,
					email: decoded.email,
				},
			});
			if (!karyawan) {
				return res.status(404).send({
					auth: false,
					message: "karyawan not found!",
					errors: err,
				});
			}
			req.karyawanId = parseInt(decoded.id);
			next();
		});
	},
};
