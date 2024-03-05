import React from "react";


const AddProblem=()=>{
    const [inputValues, setInputValues] = useState([]);

    const handleInputChange = (event) => {
        const newInputValues = [...inputValues];
        newInputValues[event.target.id] = event.target.value;
        setInputValues(newInputValues);
      };

    return (
        <div className="flex justify-center items-center h-screen">
               
             <div className="w-96 p-6 shadow-lg bg-slate-400 rounded-md">
                <h1 className="text-2xl text-center font-extrabold">Add  </h1>
                 {/* <div class="mr-3 mt-2">
                <input  className="inputBox w-80 " type="text" 
                value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Problem Name"/>
                </div>
                 <div class="mr-3 mt-2">
                <input  className="inputBox w-80" type="text"
                 value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Description of Problem"/>
                  </div>

                  <div class="mr-3 mt-2">
                <input  className="inputBox w-80" type="text"
                 value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Constraints of Problem"/>
                  </div>

                  <div class="mr-3 mt-2">
                <input  className="inputBox w-80" type="text"
                 value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Input of Problem"/>
                  </div>

                  <div class="mr-3 mt-2">
                <input  className="inputBox w-80" type="text"
                 value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter OutPut of Problem"/>
                  </div> */}


<input type="text" value={inputValues[0]} onChange={handleInputChange} id="0" />
<input type="text" value={inputValues[1]} onChange={handleInputChange} id="1" />


                 

                  {/* <div class="mr-3 mt-2">
                <button onClick={handleLogin} className="appButton font-bold outline-double
                "type="button">Sign In</button>
                </div> */}


            </div>
            </div>
        )
    
}

export default AddProblem;