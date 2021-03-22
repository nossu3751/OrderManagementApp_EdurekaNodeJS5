const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    userId:{type:String},
    itemId:{type:String},
    date:{type:Date, default:Date.now}
},
{
    collection:"orders"
})

module.exports = mongoose.model('order', orderSchema);