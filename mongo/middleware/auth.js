const jwt=require('jsonwebtoken');
const User = require( '../models/user' );
const authentificate=async(req,res,next)=>{
 try{
  const token=req.headers.authorization.split(" ")[1];
  if(!token)return res.status(401).json({error:"non autorisé"})
  const decoded=jwt.verify(token,"joker");
req.userId=decoded._id

next()
 }
 
 catch(e){
  res.status(401).json({error:"token invalide"})

 }

}
module.exports=authentificate;