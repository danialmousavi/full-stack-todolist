const { default: mongoose } = require("mongoose");

const userSchema=mongoose.Schema({
    firstname:{
        type:"String",
        required:true
    },
    lastname:{
        type:"String",
        required:true
    },
    username:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    role:{
        type:"String",
        required:true
    },
    
})

const userModel=mongoose.models.User||mongoose.model("User",userSchema)
export default userModel