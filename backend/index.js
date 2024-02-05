const express= require("express");
require("dotenv").config();
const {DBConnection}=require('./database/db');
const User = require("./model/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app=express();

const PORT=process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

DBConnection();

app.get('/',(req,res)=>{
    res.send("welcome in online Judge");
});


app.post('/register', async (req,res)=>{

    try{

    

//get all the data from frontend
const {name,email,password}=req.body;

//check all data should exist or not
if(!(name && email && password)){
    return res.status(400).send("Please enter all the required Fields!");
}

//check if user already is exist or not

const isUserExists=await User.findOne({email});

if(isUserExists){
    return res.status(200).send("User with this mail is already exists!");
}

//encrypt the user password
const hashedPassword=await  bcrypt.hash(password,10);

  //save the user data in db
  const userData=await User.create({
    name, email, password: hashedPassword,
  });


  //generate a token and sent it
  const token =jwt.sign({id:User._id,email},process.env.SECRET_KEY,{
    expiresIn: '1h'
  });
  userData.token=token;
  userData.password=undefined;

  res.status(200).json({
    message:"You have Successfully registered!",
    userData
  });

}
catch(error){
    console.log("Error:" + error.message);
}


});


app.post('/login', async (req,res)=>{

  try{
    const {email,password}=req.body;


  }
  catch(error){

  }

});

app.listen(PORT,()=>{
    console.log("Server listening on port 8080");
});

