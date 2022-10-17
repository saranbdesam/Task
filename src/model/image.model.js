const mongoose = require('mongoose');

const imgSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'userSchema'
    },
    image :{
    type :String,
    required :true
    }
});

module.exports =mongoose.model('imgDb',imgSchema);