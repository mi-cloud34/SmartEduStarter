const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","teacher","admin"]
    },
    courses:
      [{ type:mongoose.Schema.Types.ObjectId,
        ref:'Course'}]
    
})
UserSchema.pre('save',function(next){
    if (!this.isModified('password')) return next();
    const user=this;
    bcrypt.hash(user.password,10,(err,hash)=>{
      console.log(err);
      user.password=hash;
      next();
    })
});
const User=mongoose.model("User",UserSchema);
module.exports=User;