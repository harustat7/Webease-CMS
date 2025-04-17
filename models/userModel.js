const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    fullname:String,
    email:{ type: String, required :true, unique :true},
    password: { type: String, required: true },
    order:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String
}); 

module.exports=mongoose.model("user",userSchema); 