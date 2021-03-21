const express = require('express');
const router = express.Router();
const cors = require('cors');
var user=require('../models/user.model');

var corsOption={
    origin:'*',
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now());
    next();
})

//get
router.get('/user', (req,res)=>{
    user.find((err,data)=>{
        if(err)
            throw err;
        else
            res.json(data);
    })
})  

router.post('/user', cors(corsOption) ,(req,res)=>{
    user.create(req.body,(err,data)=>{
        if(err) 
            throw err;
        else 
            res.send(req.body);
    })
})

router.put('/user', cors(corsOption), (req,res)=>{
    let query = req.body;
    console.log("updating",query);
    console.log(query._id);
    user.updateOne(
        {
            "_id":query._id
        },
        {
            "$set":query
        },
        (err,data)=>{
            if(err){
                throw err;
            }else{           
                res.send("updated!");
            }
        }
    )
})

router.delete('/user', (req,res)=>{
    let query = req.body;
    user.deleteOne(
        {
            "_id":query._id
        },
        (err)=>{
            if (err) throw err;
            else res.send(`deleted ${query}`);
        }
    )
})

module.exports = router;