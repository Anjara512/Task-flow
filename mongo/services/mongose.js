require('dotenv').config()
const { default: mongoose } = require( "mongoose" );
const sharp=require('sharp')


const main=async()=>{
 await mongoose.connect(process.env.MONGO_URL);
}

const compresesImage=async(input)=>{
 await sharp(input).resize(800).toFormat("jpeg").jpeg({quality:80});
}
module.exports={
 main,compresesImage
};