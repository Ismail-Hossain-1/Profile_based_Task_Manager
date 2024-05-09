const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const router = require('./router/userRouter');

app.use(cors());



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', router);

app.get('/', (req, res) => {
    res.send("running");
});

app.listen(process.env.PORT, () => {
    console.log('running on http://localhost:3000');
})