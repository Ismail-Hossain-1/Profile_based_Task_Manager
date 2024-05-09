const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_manager"
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log({ error: err.message });
    }
    console.log("Connected to mysql");
    connection.release();
})



const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const id = uuidv4();


    try {

        await pool.query('SELECT Email FROM tbl_users WHERE Email = ?', [email], (err, result) => {
            if (err) throw err;
            else if (result.length == 0) {
                pool.query(`INSERT INTO tbl_users (Id, Name, Email, Password_) VALUES (?,?, ?, ?)`, [id, name, email, hashedPassword],
                    (err, result1) => {
                        if (err) throw err;
                        res.json(result1);
                    })
            }
            else if (result.length > 0) {
                res.json("Email already exists");
            }
        });



    } catch (err) {
        console.log(err);
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Invalid Credentials" });
        return;
    }





    await pool.query('SELECT * FROM tbl_users WHERE Email = ?', [email], function (err, result) {
        try {

            if(err){
                res.json("Invalid Credentials");
            }
            if(result.length>0){
                const isValid= bcrypt.compare(password, result[0].Password_);
                const user={
                    name: result[0].Name,
                    email:result[0].Email,
                    role: result[0].Role
                };

                const token = jwt.sign(user, process.env.JWT_TOKEN);


                res.cookie('token', token).json(user);
                
            }

        } catch (error) {
            console.error(error);
        }
    });



}

const logout= (req, res)=>{
    res.clearCookie('token');
    res.json("Logged Out");
}

module.exports = { createUser, loginUser, logout };