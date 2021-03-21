const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{type:String},
    address:{type:String},
    email:{type:String},
    date:{type:Date, default:Date.now}
},
{
    collection:"users"
})

module.exports = mongoose.model('user', userSchema);