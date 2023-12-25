const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	// aws ip
	host: "localhost",
	// mysql username
	user: "root",
	// mysql user password
	password: "wndrnjs1@",
	// db name
	database: "Broomi",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = pool;
