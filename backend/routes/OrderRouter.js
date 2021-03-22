const express = require('express');
const router = express.Router();
const cors = require('cors');
var order=require('../models/order.model');

var corsOption={
    origin:'*',
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now());
    next();
})

router.get('/:id', cors(corsOption),(req,res)=>{
    let id = req.params.id;

    order.find(
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
router.get('/', cors(corsOption),(req,res)=>{
    order.find((err,data)=>{
        if(err)
            throw err;
        else
            res.json(data);
    })
})  

router.post('/', cors(corsOption) ,(req,res)=>{
    order.create(req.body,(err,data)=>{
        if(err) 
            throw err;
        else 
            res.send(req.body);
    })
})

router.put('/', cors(corsOption), (req,res)=>{
    let query = req.body;
    console.log("updating",query);
    console.log(query._id);
    order.updateOne(
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
    order.deleteOne(
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