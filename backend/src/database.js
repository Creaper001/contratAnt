require('dotenv').config();
const mysql = require('mysql');
const bluebird = require('bluebird');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

bluebird.promisifyAll(connection);

module.exports = connection;
