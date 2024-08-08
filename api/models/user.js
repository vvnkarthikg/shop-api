//we install mongoose-sequence to auto-increment order id


const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required : true,
        match : /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
        unique : true

    },
    password:{
        type:String,
        required : true
    },
    userId:{
        type:Number,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.plugin(AutoIncrement, {inc_field : 'userId'});

module.exports = mongoose.model('User',userSchema);