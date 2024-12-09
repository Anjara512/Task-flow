const express=require('express');
const router=new express.Router();
const User=require('../models/user');
const authentificate = require( '../middleware/auth' );
const { compresesImage } = require( '../services/mongose' );

router.post('/createUser',async(req,res)=>{
 try {
  const {email,password,nom,age,sexe,photo}=req.body;
 
 
 const user=new User({email,password,nom,age,sexe,photo});
 let token=await user.generateTokenAndSave();
 res.status(201).send({token,user});
  
 } catch (error) {
  
   console.log(newPicture)
 }
});

router.post('/',async(req,res)=>{
 try{
  const user=await User.FindUser(req.body.email,req.body.password);
  const token=await  user.generateTokenAndSave()
  res.json({token,user});

 }
 catch{
  res.status(400).send('error')

 }

});
router.get('/getUser',async(req,res)=> {
 const user=await User.find();
 res.status(201).send(user)
})

router.post('/addTask',authentificate,async(req,res)=>{
 const {content,  timecreate,datecreate}=req.body;
 const user=await User.findById(req.userId);
 user.tasks.push({content,  timecreate,datecreate});
 res.send('ok')
 await user.save()
 

});
router.get('/todo',authentificate,async(req,res)=>{
 const user=await User.findById(req.userId);
 if(!user)res.status(400).send("error taches introuvable");
 res.json(user.tasks);

});
router.get('/modify/:id',authentificate,async(req,res)=>{
 const user=await User.findById(req.userId);
 const {id}=req.params;
 let modtask=  user.tasks;
let newTask=modtask.filter((el)=>{
 return el._id==id;
});
res.send(newTask)
});
router.patch('/modify/:id',authentificate,async(req,res)=>{
  const {content}=req.body;
 const user=await User.findById(req.userId);
 const {id}=req.params;
 let modtask=  user.tasks;
let newTask=modtask.filter((el)=>{
 return el._id==id;
});
let joke=newTask.map((el)=>{
 return el.content=content;
});
await user.save();
res.send('ok')

});
router.delete('/delete/:id',authentificate,async(req,res)=>{
const user=await User.findById(req.userId);
const {id}=req.params;

user.tasks=user.tasks.filter((el)=>{
return el._id !=id ;
});
await user.save();
res.json(user.tasks);
});

router.post('/logout',async(req,res)=>{
  try{

    res.status(200).send("user deconnected");
  }
  catch(error){

    res.status(400).send("not")
  }



})


module.exports=router;