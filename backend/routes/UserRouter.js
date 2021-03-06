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

router.get('/:id', (req,res)=>{
    let id = req.params.id;

    user.find(
        {"_id":id},
        (err,data)=>{
            if(err){
                throw err;
            }else{
                res.json(data);
            }
        }
    )
})
//get
router.get('/', (req,res)=>{
    user.find((err,data)=>{
        if(err)
            throw err;
        else
            res.json(data);
    })
})  

router.post('/', cors(corsOption) ,(req,res)=>{
    // user.create(req.body,(err,data)=>{
    //     if(err) 
    //         throw err;
    //     else 
    //         res.send(req.body);
    // });
    let query = req.body;
    user.updateOne(
        {
            "name":query.name,
            "email":query.email
        },
        {
            "$set":query,
            "date":Date.now()
        },
        {
            "upsert":true
        },
        (err, data)=>{
            if(err){
                throw err;
            }else{
                res.send(query);
            }
        }
    )
})

router.put('/', cors(corsOption), (req,res)=>{
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

router.delete('/',cors(corsOption), (req,res)=>{
    let query = req.body;
    user.deleteOne(
        {
            "_id":query._id
        },
        (err)=>{
            if (err) throw err;
            else res.send(`deleted ${query.body}`);
        }
    )
})

module.exports = router;