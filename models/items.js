const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
    id : {
        type: String, 
    },
    name : {
        type : String,
        required : true
    }
});

const Items = mongoose.model('Items' , itemsSchema);

module.exports = Items;