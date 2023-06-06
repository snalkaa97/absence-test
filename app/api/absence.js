const Absensi = require("../models").Absensi;

module.exports = {
	async getAbsen(req, res) {
		await Absensi.findAll({
			// query
			//attributes
		})
			.then((results) => {
				return res.status(200).send({
					message: "get absenses",
					data: results,
				});
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).send({
					message: err,
				});
			});
	},

	async checkin(req, res) {
		const { status } = req.body;
		const karyawan_id = req.karyawanId;
		const waktu_absen = new Date();
		await Absensi.create({
			karyawan_id: karyawan_id,
			waktu_absen: waktu_absen,
			status: status,
		})
			.then(() => {
				return res.status(200).send({
					message: "success absent",
				});
			})
			.catch((err) => {
				return res.status(500).send({
					message: err,
				});
			});
	},
};
