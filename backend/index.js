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

const fs=require('fs');
const path=require('path');

const PORT=process.env.PORT || 8000;

const upload=multer({dest:'inputTestcaseFiles'})

const uploadOp=multer({dest:'outputTestcaseFiles'})


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
const {problem_name,description,constraint,input,output,userId,testcaseInput,testcaseOutput}=req.body;

//check all data should exist or not
if(!(problem_name && description && constraint&&input&&output)){
  return res.status(400).send("Please enter all the required Fields!");
}




//save the user data in db
const problemData=await Problem.create({
  problem_name,description,constraint,input,output,userId,testcaseInput,testcaseOutput
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

console.log("RunINN+",inputpath);
var output=""
if(req.body.language==="cpp"){
 output = await executeCpp(filepath,inputpath);
}
else if(req.body.language==="java"){

   output = await executeJava(filepath,inputpath);
}
console.log('outtputRunn',output);
        res.json({ filepath, output });

}
catch(error){
  res.status(500).json({error: error});
}






});



//code submit button
app.post("/submit/:id",async(req,res)=>{
  const language=req.body.language;
  const code=req.body.code;
  //const input=req.body.input;
  let result=await Problem.findOne({_id:req.params.id});
  console.log("SubRES",result.testcaseInput);

  //const dirCode=path.join(__dirname,`${result.testcaseInput}.txt`);

  const dirCode=path.join(__dirname,result.testcaseInput);

  const dirCode1=path.join(__dirname,result.testcaseOutput);

  console.log("SubIN",dirCode);

  console.log("SubOut",dirCode1);

  // Use fs.readFile() method to read the file
  var testCasesInputfile = await fs.readFileSync(dirCode, {
    encoding: "utf8",
    flag: "r"
  });

  
  console.log("dirrrr",testCasesInputfile);

  testCasesInputfile = testCasesInputfile.split(/[\r\n]+/).filter(n => n);
  console.log("splitting", testCasesInputfile);


  var testCasesOutputfile = await fs.readFileSync(dirCode1, {
    encoding: "utf8",
    flag: "r"
  });

  const filepath=await generateFile(language,code);
  
  console.log("dirrrr",testCasesOutputfile);

  testCasesOutputfile = testCasesOutputfile.split(/[\r\n]+/).filter(n => n);
  console.log("splittingOO", testCasesOutputfile);

  console.log("0",testCasesInputfile.length);

  //const inputFilePath=


  
  if(!language){
    return res.status(400).send("Please choose language!");
  }
  if(!code){
    return res.status(400).send("Empty code body");

  }
  for (var i = 0; i < testCasesInputfile.length; i++) {
  try{
  
  const inputpath=await generateInputFile(testCasesInputfile[i]);
   var output=""
  if(req.body.language==="cpp"){
   output = await executeCpp(filepath,inputpath);
  }
   else if(req.body.language==="java"){
  
      output = await executeJava(filepath,inputpath);
   }

      console.log("outt",output)


      output = output.trim();




      if(output!=testCasesOutputfile[i]){
       

        res.json({   message:`Test Case Failed ${i + 1}`,
         

      });
      return;
      }
  // }
        
         
 
      
  }
  catch(error){
    res.status(500).json({error: error});
  }
}

res.json({   message:"Code sucessfully submitted",
});
  
  
  
  
  
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

///tc
// app.post("/upload",upload.single('file') , async(req,res)=>{

 

//   const fileobj={
//     testcaseInput: req.file.path,
//   }
//   console.log("ipPath",fileobj);

//   try{
//    //const file =await Problem.create(fileobj);
//     // res.status(200).json({path:`http://localhost:8080/file/${file._id}`})
//     const path=fileobj['testcaseInput'];
//     console.log("PPP",path);
//     res.status(200).json({path});

//   }
//   catch(error){
//     console.log(error.message);
//   }


// });


// app.post("/uploadOp",uploadOp.single('file') , async(req,res)=>{

 

//   const fileobj={
//     testcaseOutput: req.file.path,
//   }
//   console.log("OpPath",fileobj);

//   try{
//     //const file =await Problem.create(fileobj);
//     const path=fileobj['testcaseOutput'];
//     res.status(200).json({path});
//   }
//   catch(error){
//     console.log(error.message);
//   }


// });


//////////////////////bha
app.post("/upload", upload.single('file'), async (req, res) => {
  //console.log(req);
  const fileobj = {
    testcaseInput: req.file.path,
  };
  //console.log("ipPath", fileobj);

  try {
    let Inputpath = fileobj['testcaseInput'];
    //console.log("PPP", Inputpath);
    res.status(200).json({ Inputpath });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post("/uploadOp", uploadOp.single('file'), async (req, res) => {
  const fileobj = {
    testcaseOutput: req.file.path,
  };
//console.log("OpPath", fileobj);

  try {
    let outputpath = fileobj['testcaseOutput'];
    res.status(200).json({ outputpath });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});




app.listen(PORT,()=>{
    console.log("Server listening on port 8080");
});

