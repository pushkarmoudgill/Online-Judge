import React ,{useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate =useNavigate();
    useEffect(()=>{
const auth =localStorage.getItem('user');

  if(auth){
    navigate("/problems")
  }
    },[])
    const handleLogin= async()=>{
        console.warn(email,password)
        let result =await fetch('http://localhost:8080/login',{
           method:'post',
           body:JSON.stringify({email,password}),
           headers:{
            'Content-Type':'application/json'
        },
    
    
        });
       if(result.status===400){
        alert("Please enter correct Details");
       }
        
        result=await result.json();
        console.warn(result)

       if(result.user){
            localStorage.setItem("user", JSON.stringify(result));
           // localStorage.removeItem('user.password');
            navigate("/problems");
       }

        }
    return (
        <div className="flex justify-center items-center h-screen">
               
             <div className="w-96 p-6 shadow-lg bg-slate-400 rounded-md">
             <h1 class='mt-2 font-bold text-pink-900 text-[48px] '>Give And Learn</h1>

                <h1 className="text-2xl text-center font-extrabold">Login  </h1>
                 <div class="mr-3 mt-2">
                <input  className="inputBox w-80 " type="text" 
                value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
                </div>
                 <div class="mr-3 mt-2">
                <input  className="inputBox w-80" type="password"
                 value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
                  </div>
                  <div class="mr-3 mt-2">
                <button onClick={handleLogin} className="appButton font-bold outline-double
                "type="button">Sign In</button>
                </div>
            </div>
            </div>
        )
    
};


export default Login;