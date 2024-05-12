const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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


const addTask = async (req, res) => {
    const email = req.user;
    const { title, description, status } = req.body;
    const id= uuidv4()


    await pool.query('INSERT INTO tbl_tasks (tbl_task_id, title, description, status_, user_email) VALUES (?,?, ?, ?, ?)', [id,title, description, status, email], (err, result) => {
        if (err) throw err;
        res.json("Task Added");


    }
    );

}

const updateTask = async (req, res) => {
    const {id} = req.params;
    const { title, description, status } = req.body;
    await pool.query('UPDATE tbl_tasks SET title = ?, description = ?, status_ =? WHERE tbl_task_id=?',
        [title, description, status, id], (err, result) => {
            if(err) throw err;
            res.json("updated");
        }
    )
}

const deletetask= async( req, res)=>{
    const {id}= req.params;
    await pool.query('DELETE FROM tbl_tasks WHERE tbl_task_id=?',[id], (err, data)=>{
        if(err) throw err;
        res.json("Deleted");
    })

}

const getTasks = async (req, res)=>{
    const email = req.user;
    try {
         await pool.query('SELECT title, description, status_ FROM tbl_tasks WHERE user_email=? ',[email], (err, result)=>{
           if(err) throw err;
           res.json(result); 
        });
    } catch (error) {
        console.error(error);
    }
}

const seeUsers= async(req, res)=>{
    try {
        await pool.query('SELECT Name, Email, Role from tbl_users Where Role=?',['user'], (err, result)=>{
                if(err) throw err;
                console.log(result);
                res.json(result);
        })
    } catch (error) {
        
    }
}



module.exports = { addTask, updateTask, getTasks, deletetask, seeUsers };