const express= require("express");
const cors=require("cors");
require("dotenv").config();
const {DBConnection}=require('./database/db');
const User = require("./model/User");
const Problem=require("./model/Problem.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const app=express();

const cookieParser=require('cookie-parser');
const{generateFile}=require('./generateFile.js');
const{executeCpp}=require('./executeCpp.js');
const{executeJava}=require('./executeJava.js');
const{generateInputFile}= require('./generateInputFile.js');
const multer =require('multer')



const PORT=process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());
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
    return res.status(400).send("User with this mail is already exists!");
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
    success:true, 
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
        return res.status(400).send("User with this mail not  exists!");
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
    user
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

app.post("/run",async(req,res)=>{
const language=req.body.language;
const code=req.body.code;
const input=req.body.input;

if(!language){
  return res.status(400).send("Please choose language!");
}
if(!code){
  return res.status(400).send("Empty code body");
}

try{
const filepath=await generateFile(language,code);
const inputpath=await generateInputFile(input);
var output=""
if(req.body.language==="cpp"){
 output = await executeCpp(filepath,inputpath);
}
else if(req.body.language==="java"){

   output = await executeJava(filepath,inputpath);
}
        res.json({ filepath, output });

}
catch(error){
  res.status(500).json({error: error});
}






});

app.get("/getAllProblems",async(req,res)=>{

  try{
      const problems=await Problem.find({})
      if((!problems)){
        return res.status(400).send({
          success:false,
          message:'No Problem found',
        });
      }
      return res.status(200).send({
        success: true,
        message:'All Problems list',
        problems,
      })
  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error while get Problems',
      error
    })
  }


});


//get problem by id

app.get("/getProblem/:id",async(req,res)=>{
  let result=await Problem.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }else{
      res.send({result:"Problem not available"})
  }
})







app.listen(PORT,()=>{
    console.log("Server listening on port 8080");
});

