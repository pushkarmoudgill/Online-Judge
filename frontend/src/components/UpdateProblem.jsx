import React, { useState, useEffect } from "react";
import { uploadFile, uploadFileop } from "../service/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const UpdateProblem = () => {

  const api_url=import.meta.env.VITE_BACKEND_URL;

    const [problem_name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [constraint, setConstraint] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [testcaseInput, setInputFile] = useState(null);
    //console.log(inputFile);
    const [testcaseOutput, setOutputFile] = useState(null);
    const navigate =useNavigate();

   const params=useParams();

   
  
    useEffect(() => {
        getProblemDetails();
    },[])

      const getProblemDetails=async()=>{
        console.warn(params);
        let result=await fetch(`${api_url}/getProblem/${params.id}`);
        result =await result.json();
         setName(result.problem_name);
         setDescription(result.description);
         setConstraint(result.constraint);
         setInput(result.input);
         setOutput(result.output);

      }

      const getInput = async () => {
        if (testcaseInput) {
          const data = new FormData();
          data.append("name", testcaseInput.name);
          data.append("file", testcaseInput);
  
          const response = await uploadFile(data);
          console.log("IPPP",response);
          setInputFile(response['Inputpath']);
         // console.log("PayIP",inputFile);
         if(response.message==="success"){
          alert("Input TestCase file Uploaded")
         }
        }
      };
    
      const getOutput = async () => {
        if (testcaseOutput) {
          const data = new FormData();
          data.append("name", testcaseOutput.name);
          data.append("file", testcaseOutput);
  
          const response = await uploadFileop(data);
          setOutputFile(response['outputpath']);
          if(response.message==="success"){
            alert("Output TestCase file Uploaded")
           }
        }
      };
    //   getOutput();
    // }, [outputFile]);
  
    const updateProblem =async  () => {
    //   let userId = JSON.parse(localStorage.getItem("user"));
    //   userId = userId.user._id;
  
    //   console.log("II",testcaseInput);
    //   console.log("OO",testcaseOutput);
    let result = await fetch(`${api_url}/update/${params.id}/${params.userid}`,{
        method:"Put",
          body: JSON.stringify({
          problem_name,
          description,
          constraint,
          input,
          output,
          //userId,
          testcaseInput: testcaseInput,
          testcaseOutput: testcaseOutput
        }),
              headers: {
          "Content-Type": "application/json",
        },
       });
       result=await result.json();
       navigate('/problems');
    };
  
    return (
      <div className="problem">
        <h1 className="font-semibold text-2xl text-pink-600 mr-80">
          Update Problem
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
          className="mr-80 appButton font-bold outline-double text-pink-600 bg-pink-200"
        >add Input</button>
  
        <h1 className="inputBox">Output Testcases File Upload</h1>
        <input
          type="file"
          onChange={(e) => setOutputFile(e.target.files[0])}
        />
         <button
          onClick={getOutput}
          className="mr-80 appButton font-bold outline-double text-pink-600 bg-pink-200"
        >add Output</button>
  
        <button
          onClick={updateProblem}
          className=" ml-0 mt-4 mr-80 appButton font-bold outline-double text-pink-600 bg-pink-200"
        >
         Update DSA Problem        </button>
      </div>
    );
  };
export default UpdateProblem;