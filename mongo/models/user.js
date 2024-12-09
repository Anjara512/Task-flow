require('dotenv').config()
const { default: mongoose } = require( "mongoose" );
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const TaskSchema=new mongoose.Schema({
   content:{
      type:String,
      required:true
   },
   timecreate:{
      type:String,
   },
   datecreate:{
      type:Number
   }
});

const UserSchema= new mongoose.Schema({
 email:{
  required:true,
  unique:true,
  type:String
 },
 password:{
required:true,
type:String
 },

 nom:{
  required:true,
  type:String
 },
 age:{
  type:Number
 },
 sexe:{
   type:String
 },
 tasks:[TaskSchema],

 authtokens:[
{  
   token:{
    type:String,
    required:true
   }
  }
  
 ]
});

UserSchema.methods.generateTokenAndSave=async function(){
 const token=jwt.sign({_id:this._id.toString()},"joker");
  this.authtokens.push({token});
 await this.save();
 return token;


}
UserSchema.statics.FindUser=async (email,password)=>{
 const user =await User.findOne({email});
 if(!user)throw new Error('email icorrect');
 const isPasswordValid=await bcrypt.compare(password,user.password);
 if(!isPasswordValid)throw new Error('impossible de se connecter');
 return user;


}

UserSchema.pre('save',async function(){
 if(this.isModified('password'))this.password=await bcrypt.hash(this.password,8);
})
const User=mongoose.model('User',UserSchema);

module.exports=User
