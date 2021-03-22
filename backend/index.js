const express = require("express");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const port = 8002;
const UserRoutes = require('./routes/UserRouter');
const ItemRoutes = require('./routes/ItemRouter');
const OrderRoutes = require('./routes/OrderRouter');
const EmailRoutes = require('./routes/EmailRouter');

app.use('/item',ItemRoutes);
app.use('/user',UserRoutes);
app.use('/order',OrderRoutes);
app.use('/email', EmailRoutes);

const connection = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/assignment5",{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

connection.once("open",()=>{
    console.log("Mongo DB connected!");
})



app.listen(port, ()=>{
    console.log("Successfully connected to Express server!");
})
// const connection = mongoose.connection;
// connection.once("open",()=>{
//     console.log("MongoDB connected!")
// })
// MongoClient.connect(mongoUrl, (err, client)=>{                       
//     if(err) throw err;
//     let db = client.db("assignment5");

//     
// })


// createUserCollection = (db) => {
//     db.listCollections().toArray((err, res)=>{
//         if(err) throw err;
//         let userCollection = res.find((c) => (
//             c.name === "users"
//         ));
        
//         if(userCollection !== undefined){
//             console.log("already exists!");
//         }else{
//             db.createCollection("users", (err, res)=>{
//                 if(err) throw err;
        
//                 console.log("Collection created!");
//             })
//         }
//     }) 
// }

// insertUser = (db, user) =>{
//     db.collection("users").update(
//         user,
//         {
//             "$set": user
//         },
//         {
//             "upsert":true
//         }
//     ).then((resolve, err)=>{
//         if(err){
//             console.log("insertion failed!");
//         }else{
//             console.log("insertion success!");
//         }
//     })
// }

// getAllUsers = (db) => {
//     db.collection("users").find({}).toArray((err,res)=>{
//         if(err) throw err;
//         console.log(res);
//     })
// }