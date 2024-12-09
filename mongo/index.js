const express=require('express');
const{ main }= require( './services/mongose' );
const app=express();
const cors=require('cors');
const UserRouter=require('./routes/route')
const port=5000;

app.use(express.json());
app.use(cors());
app.use(UserRouter);

main().then(()=>{
 console.log('connexion a la base de donné reussi')
}).catch(()=>{
 console.log('ca ne marche pas')
})


app.listen(port,()=>{
 console.log('application lancé sur le port'+port);
})

