// import React, {useState,useEffect} from "react";
// import { uploadFile } from "../service/api";
// import { uploadFileop} from "../service/api";
// //import axios from "axios";

// const AddProblem=()=>{
//   const[name,setName]=useState("");
//     const[description,setDescription]=useState("");
//     const[constraint,setConstraint]=useState("");
//     const[input,setInput]=useState("");
//     const[output,setOutput]=useState("");
//     const [inputfile, setInputFile] = useState('')
//     console.log(inputfile);
//     const [outputfile, setOutputFile] = useState('')
//     console.log(outputfile);

//    //useEffect(() => {
//       const getInput = async () => {
//         if (inputfile) {
//           const data = new FormData();
//           data.append("name", inputfile.name);
//           data.append("file", inputfile);
  
//           const response = await uploadFile(data);
//           console.log("Resss",response);
//           setInputFile(response);
//           setResult(response.path);
//         }
//       }
//     //  getInput();
//     // }, [inputfile])

//     //o/p t.c. file

//      useEffect(() => {
//       const getoutput = async () => {
//         if (outputfile) {
//           const data = new FormData();
//           data.append("name", outputfile.name);
//           data.append("file", outputfile);
  
//           const response = await uploadFileop(data);
           
//           setOutputFile(response);

//           setResult(response.path);
//         }
//       }
//       getoutput();
//     }, [outputfile])

    
    

//     const addProblem=async()=>{

//      console.warn(name)
//       const userId=JSON.parse(localStorage.getItem('user'));
//       //const luser=JSON.parse(userId.user)
//       const id=userId.user._id;

//       let result =await fetch('http://localhost:8080/addProblem',{
//         method:'post',
//         body:JSON.stringify({name,description,constraint,input,output,id,inputfile,outputfile}),
//         headers:{
//          'Content-Type':'application/json'
//      },
     

 
//      });

//      result=await result.json();
//      console.warn(result);
//     }

//     function myFunction(){
      
//       addProblem();
//   }

    
//     return (
//         <div className="problem ">
               
//             <h1 class="font-semibold text-2xl text-pink-600 mr-80 ">Share You had facing DSA Problem in Interviews</h1>
//             <input type="text" placeholder="Enter Problem Name" className="inputBox"
//              value={name} onChange={(e)=>setName(e.target.value)}/>
//             <input type="text" placeholder="Enter Problem Description"  className="inputBox"
//             value={description} onChange={(e)=>setDescription(e.target.value)} />
//             <input type="text" placeholder="Give Constraints"  className="inputBox"
//              value={constraint} onChange={(e)=>setConstraint(e.target.value)}/>
//             <input type="text" placeholder="Enter Input"  className="inputBox"
//              value={input} onChange={(e)=>setInput(e.target.value)}/>
//             <input type="text" placeholder="Enter Output"  className="inputBox"
//              value={output} onChange={(e)=>setOutput(e.target.value)}/>
//             <h1 className="inputBox">Input Testcases File upload</h1>
//           <input type="file" onChange={(e)=> setInputFile(e.target.files[0])} />
//           <h1 className="inputBox">Output Testcases File Upload</h1>
//           <input type="file" onChange={(e)=> setOutputFile(e.target.files[0])} />

//           <button onClick={getInput} className="appButton font-bold outline-double text-pink-600 bg-pink-200">ADD DSA PROBLEM</button>
//             </div>
//         )
    
// }

// export default AddProblem;



////////////////bha
import React, { useState, useEffect } from "react";
import { uploadFile, uploadFileop } from "../service/api";

const AddProblem = () => {
  const [problem_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [constraint, setConstraint] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [testcaseInput, setInputFile] = useState(null);
  //console.log(inputFile);
  const [testcaseOutput, setOutputFile] = useState(null);

 // useEffect(() => {
    const getInput = async () => {
      if (testcaseInput) {
        const data = new FormData();
        data.append("name", testcaseInput.name);
        data.append("file", testcaseInput);

        const response = await uploadFile(data);
        console.log("IPPP",response);
        setInputFile(response['Inputpath']);
       // console.log("PayIP",inputFile);
      }
    };
  //   getInput();
  // }, [inputFile]);

 // useEffect(() => {
    const getOutput = async () => {
      if (testcaseOutput) {
        const data = new FormData();
        data.append("name", testcaseOutput.name);
        data.append("file", testcaseOutput);

        const response = await uploadFileop(data);
        setOutputFile(response['outputpath']);
      }
    };
  //   getOutput();
  // }, [outputFile]);

  const addProblem = async () => {
    let userId = JSON.parse(localStorage.getItem("user"));
    userId = userId.user._id;

    console.log("II",testcaseInput);
    console.log("OO",testcaseOutput);

    const result = await fetch("http://localhost:8080/addProblem", {
      method: "post",
      body: JSON.stringify({
        problem_name,
        description,
        constraint,
        input,
        output,
        userId,
        testcaseInput: testcaseInput,
        testcaseOutput: testcaseOutput,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    console.log(data);
  };

  return (
    <div className="problem">
      <h1 className="font-semibold text-2xl text-pink-600 mr-80">
        Share You had facing DSA Problem in Interviews
      </h1>
      <input
        type="text"
        placeholder="Enter Problem Name"
        className="inputBox"
        value={problem_name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Problem Description"
        className="inputBox"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Give Constraints"
        className="inputBox"
        value={constraint}
        onChange={(e) => setConstraint(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Input"
        className="inputBox"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Output"
        className="inputBox"
        value={output}
        onChange={(e) => setOutput(e.target.value)}
      />
      <h1 className="inputBox">Input Testcases File upload</h1>
      <input type="file" onChange={(e) => setInputFile(e.target.files[0])} />


      <button
        onClick={getInput}
        className="appButton font-bold outline-double text-pink-600 bg-pink-200"
      >add Input</button>

      <h1 className="inputBox">Output Testcases File Upload</h1>
      <input
        type="file"
        onChange={(e) => setOutputFile(e.target.files[0])}
      />
       <button
        onClick={getOutput}
        className="appButton font-bold outline-double text-pink-600 bg-pink-200"
      >add Output</button>

      <button
        onClick={addProblem}
        className="appButton font-bold outline-double text-pink-600 bg-pink-200"
      >
        ADD DSA PROBLEM
      </button>
    </div>
  );
};

export default AddProblem;