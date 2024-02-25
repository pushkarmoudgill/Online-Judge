import React ,{useState}from "react";


const SignUp=()=>{
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const collectData=()=>{
        console.warn(name,email,password)
    }
    return(
        <div className="flex justify-center items-center h-screen bg-indigo-400">
           
            <div className="w-96 p-6 shadow-lg bg-slate-400 rounded-md">
            <h1 className="text-2xl text-center font-semibold">Register  </h1>
            
            <div class="mr-3 mt-3">
            <input className="inputBox  w-80" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
             </div>

             <div class="mr-3 mt-2">
            <input  className="inputBox w-80 " type="text" 
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            </div>
             <div class="mr-3 mt-2">
            <input  className="inputBox w-80" type="password"
             value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
              </div>
              <div class="mr-3 mt-2">
            <button onClick={collectData} className="appButton"type="button">Sign up</button>
            </div>
        </div>
        </div>
    )
}
export default SignUp;