const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name:{type:String},
    price:{type:String},
    seller:{type:String},
    category:{type:String},
    date:{type:Date, default:Date.now},
    image:{type:String}
},
{
    collection:"items"
})

module.exports = mongoose.model('item', itemSchema);