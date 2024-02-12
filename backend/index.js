const express= require("express");
require("dotenv").config();
const {DBConnection}=require('./database/db');
const User = require("./model/User");
const Problem=require("./model/Problem.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app=express();
const cookieParser=require('cookie-parser');

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

    //check all data should exist 

    if(!(email && password)){
      return res.status(400).send("Pls enter all the required fields")
    }

    //check if user is already exists or not in the database
    const user=await User.findOne({email});

    if(!user){
        return res.status(200).send("User with this mail not  exists!");
    }

      //match the password

      const enteredPassword=await bcrypt.compare(password,user.password);

      if(!enteredPassword){
        return res.status(400).send("Password is incorrect!");
      }



       //generate a jwt token and sent it
  const token =jwt.sign({id:user._id,email},process.env.SECRET_KEY,{
    expiresIn: '1h'
  });
  user.token=token;
  user.password=undefined;

  //store cookies in the browser
  const options={
    expires: new Date(Date.now()+1*24*60*60*1000),
    httpOnly:true, //only manipulate by server not by the client or user or frontend
  };

  //send the token
  res.status(200).cookie("token",token,options).json({
    message:"You have Successfully Logged in!",
    success:true,
    token,
  });


  }
  catch(error){

  }

});


//Problem add api
app.post('/addProblem', async (req,res)=>{

  try{

  

//get all the data from frontend
const {problem_name,description,constraint,input,output,userId,testcase}=req.body;

//check all data should exist or not
if(!(problem_name && description && constraint&&input&&output)){
  return res.status(400).send("Please enter all the required Fields!");
}




//save the user data in db
const problemData=await Problem.create({
  problem_name,description,constraint,input,output,userId,testcase
});




res.status(200).json({
  message:"You have Successfully add one milestone!",
  //userData
});

}
catch(error){
  console.log("Error:" + error.message);
}


});


app.listen(PORT,()=>{
    console.log("Server listening on port 8080");
});

