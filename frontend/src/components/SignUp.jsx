import React ,{useEffect,useState}from "react";

import { useNavigate } from "react-router-dom";

const SignUp=()=>{
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    
    const[email,setEmail]=useState("");
    const navigate =useNavigate();

    // useEffect(()=>{
    //     const auth =localStorage.getItem('user');
    //       if(auth){
    //         navigate("/")
    //       }
    //         },[])
    const collectData=async()=>{
        console.warn(name,email,password);
        let result =await fetch('http://localhost:8080/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        if(result.status===400){
            alert("This Email already Exist!")
        }

        result=await result.json();

       
      
       alert("User Registered Successfully")
        localStorage.setItem("user",JSON.stringify(result));

       
        //localStorage.removeItem('user.password');
       // navigate('/');
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