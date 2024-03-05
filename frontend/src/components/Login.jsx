import React ,{useState}from "react";


const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const handleLogin= async()=>{
        console.warn(email,password)
        let result =await fetch('http://localhost:8080/login',{
           method:'post',
           body:JSON.stringify({email,password}),
           headers:{
            'Content-Type':'application/json'
        },
    
    
        });
        result=await result.json();
        console.warn(result)

        if(result.name){
            localStorage.setItem("user",JSON.stringify(result))
        }else{
            alert("Please enter correct Details")
        }

        }
    return (
        <div className="flex justify-center items-center h-screen">
               
             <div className="w-96 p-6 shadow-lg bg-slate-400 rounded-md">
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