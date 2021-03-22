const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user:{type:String},
    item:{type:String},
    date:{type:Date, default:Date.now}
},
{
    collection:"orders"
})

module.exports = mongoose.model('order', orderSchema);