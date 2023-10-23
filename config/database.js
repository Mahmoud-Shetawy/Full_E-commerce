const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const dbConnection = () => {
	mongoose.connect(process.env.DB_URL).then((conn) => {
		console.log(`DataBase Connected ${conn.connection.port}`);
	});
	// .catch((err) => {
	// 	console.log(`DataBase Error : ${err}`);
	// });
};

module.exports = dbConnection;
