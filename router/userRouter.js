const express = require('express');
const router = express.Router();

const cors= require('cors');
const { createUser, loginUser, logout } = require('../controller/userController');


router.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));


router.post('/createuser', createUser);
router.post('/login', loginUser);
router.post('/logout', logout);




module.exports= router;