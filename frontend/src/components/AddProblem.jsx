import React, {useState} from "react";

//import axios from "axios";

const AddProblem=()=>{
  const[name,setName]=useState("");
    const[description,setDescription]=useState("");
    const[constraint,setConstraint]=useState("");
    const[input,setInput]=useState("");
    const[output,setOutput]=useState("");
    const [inputfile, setInputFile] = useState('')
    console.log(inputfile);
    const [outputfile, setOutputFile] = useState('')
    console.log(outputfile);

    const addProduct=()=>{

     console.warn(name)
      const userId=JSON.parse(localStorage.getItem('user'));
      //const luser=JSON.parse(userId.user)
      console.warn(userId.user._id);
    }


    //file upload
    // let fData=new FormData();
    // fData.append("name",name);
    // fData.append("description",description);
    // fData.append("constraint",constraint);
    // fData.append("input",input);
    // fData.append("output",output);
    // fData.append("inputfile",inputfile);
    // fData.append("outputfile",outputfile);

    //let res=await axios.post("http://localhost:8080/addProblem")
     
    //console.log(res)
    return (
        <div className="problem ">
               
            <h1 class="font-semibold text-2xl text-pink-600 mr-80 ">Share You had facing DSA Problem in Interviews</h1>
            <input type="text" placeholder="Enter Problem Name" className="inputBox"
             value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Enter Problem Description"  className="inputBox"
            value={description} onChange={(e)=>setDescription(e.target.value)} />
            <input type="text" placeholder="Give Constraints"  className="inputBox"
             value={constraint} onChange={(e)=>setConstraint(e.target.value)}/>
            <input type="text" placeholder="Enter Input"  className="inputBox"
             value={input} onChange={(e)=>setInput(e.target.value)}/>
            <input type="text" placeholder="Enter Output"  className="inputBox"
             value={output} onChange={(e)=>setOutput(e.target.value)}/>
            <h1 className="inputBox">Input Testcases File upload</h1>
          <input type="file" onChange={(e)=> setInputFile(e.target.files[0])} />
          <h1 className="inputBox">Output Testcases File Upload</h1>
          <input type="file" onChange={(e)=> setOutputFile(e.target.files[0])} />

          <button onClick={addProduct} className="appButton font-bold outline-double text-pink-600 bg-pink-200">ADD DSA PROBLEM</button>
            </div>
        )
    
}

export default AddProblem;