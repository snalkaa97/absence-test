const Karyawan = require("../models").Karyawan;

module.exports = {
	checkDuplicateUserNameOrEmail(req, res, next) {
		Karyawan.findOne({
			where: {
				email: req.body.email,
			},
		}).then((karyawan) => {
			if (karyawan) {
				res.status(400).send({
					auth: false,
					id: req.body.id,
					message: "Email is already in use",
					errors: "Email is already in use",
				});
				return;
			}
			next();
		});
	},
};
