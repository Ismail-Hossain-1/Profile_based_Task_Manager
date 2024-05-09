const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const config = require('../db/config');

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
    if (err) {
        console.log({ error: err.message });
    }
    console.log("Connected to mysql from task");
    connection.release();
});







module.exports ={};
