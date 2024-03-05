import React ,{useState}from "react";


const SignUp=()=>{
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const collectData=async()=>{
        console.warn(name,email,password);
        const result =await fetch('http://localhost:8080/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        console.warn(await result.json());
    }
    return(
        <div className="flex justify-center items-center h-screen">
           
            <div className="w-96 p-6 shadow-lg bg-slate-400 rounded-md">
            <h1 className="text-2xl text-center font-extrabold">Register  </h1>
            
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
            <button onClick={collectData} className="appButton font-semibold outline-double
            "type="button">Sign up</button>
            </div>
        </div>
        </div>
    )
}
export default SignUp;