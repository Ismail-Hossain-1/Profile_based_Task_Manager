const express = require('express');
const router = express.Router();
router.use(express.json());

const { verifyAdmin, verifyUser } = require('../middleware/jwtVerify');
const { addTask, updateTask, getTasks, deletetask, seeUsers } = require('../controller/taskController');



router.post('/deleteall', verifyAdmin, (req, res)=>{
  console.log("OK");
});

router.post('/addtask', verifyUser, addTask);
router.put('/updatetask/:id',verifyUser ,updateTask);
router.delete('/deletetask/:id', verifyUser,deletetask);

router.get('/mytasks', verifyUser, getTasks);
router.get('/seeusers', verifyAdmin, seeUsers);


module.exports =router;