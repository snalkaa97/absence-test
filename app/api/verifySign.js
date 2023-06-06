const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Karyawan = require("../models").Karyawan;
const config = require("../config/configRoles");

module.exports = {
	async signup(req, res) {
		await Karyawan.create({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password || "12345678", 8),
			// role_id: role.dataValues.id
		})
			.then((karyawan) => {
				var token =
					"Bearer " +
					jwt.sign(
						{
							id: karyawan.id,
							email: karyawan.email,
						},
						config.secret,
						{
							expiresIn: 86400, //24h expired
						}
					);
				return res.status(200).send({
					auth: true,
					error: null,
					success: true,
					karyawanToken: token,
					karyawanInfo: {
						name: karyawan.name,
						email: karyawan.email,
					},
					message: "Karyawan registered successfully.",
					error: null,
				});
			})
			.catch((err) => {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err,
				});
			});
	},

	signin(req, res) {
		// console.log(req.body);
		return Karyawan.findOne({
			where: {
				email: req.body.email,
			},
			attributes: ["id", "name", "email", "password"],
		})
			.then((karyawan) => {
				console.log(karyawan);
				if (!karyawan) {
					return res.status(404).send({
						auth: false,
						id: req.body.id,
						accessToken: null,
						karyawanInfo: null,
						message: "User Not Found",
						errors: "User Not Found.",
					});
				}
				var passwordIsValid = bcrypt.compareSync(
					req.body.password,
					karyawan.password
				);
				if (!passwordIsValid) {
					return res.status(500).send({
						auth: false,
						id: req.body.id,
						accessToken: null,
						karyawanInfo: null,
						message: "Invalid Password!",
						errors: "Invalid Password!",
					});
				}
				console.log(karyawan.email);
				var token =
					"Bearer " +
					jwt.sign(
						{
							id: karyawan.id,
							email: karyawan.email,
						},
						config.secret,
						{
							expiresIn: 86400, //24h expired
						}
					);

				console.log(token);

				res.status(200).send({
					auth: true,
					id: req.body.id,
					accessToken: token,
					karyawanInfo: {
						name: karyawan.name,
						email: karyawan.email,
					},
					message: "Error",
					errors: null,
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send({
					auth: false,
					id: req.body.id,
					accessToken: null,
					message: "Error",
					errors: err,
				});
			});
	},
};
