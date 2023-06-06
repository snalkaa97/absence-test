"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Absensi extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Absensi.init(
		{
			karyawan_id: DataTypes.STRING,
			waktu_absen: DataTypes.DATE,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Absensi",
		}
	);
	return Absensi;
};
