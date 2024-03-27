import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';








const SolveProblem=()=>{
    const [code, setCode] = useState(`
    // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
    
   } `);

   
   const [language, setLanguage] = useState("cpp");
   const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const params=useParams();
    const [problem, setProblem] = useState('');

    useEffect(()=>{
      console.warn(params)
      getProblemDetails();
    },[])

    const getProblemDetails=async()=>{
      console.warn(params)
      let result=await fetch(`http://35.154.216.31:8080/getProblem/${params.id}`);
      result= await result.json();
      console.warn(result)
      setProblem(result);
    }

    const handleSubmit = async () => {
        const payload = {
          language,
          code,
          input
        };
    
        try {
          const { data } = await axios.post('http://35.154.216.31:8080/run', payload);
          console.log(data);
          setOutput("Output: "+data.output);
        } catch (error) {
          console.log(error.response);
        }
      }


      const handleSubmitTestCase = async () => {
        const payload = {
          language,
          code,
          input
        };
    
        try {
          const { data } = await axios.post(`http://35.154.216.31:8080/submit/${params.id}`, payload);
          console.log(data);
          setOutput("Status: "+data.message);
        } catch (error) {
          console.log(error.response);
        }
      }
    

      return (

       


        <div class="width: 100%;">


      <div class="leftbox">
        
         
      <p className='Description'><h1 class="font-bold">Problem Description:</h1>{problem.description}</p>
      <p className='Description'><h1 class="font-bold">Constraints:</h1>{problem.constraint}</p>
      <p className='Description'><h1 class="font-bold">Input:</h1>{problem.input}</p>
      <p className='Description'><h1 class="font-bold">Output:</h1>{problem.output}</p>


      
      </div>
  
       
        <div className="middlebox">
        
          <h1 className="text-2xl font-bold ml-10 mt-10 mr-80"><h class="font-bold">Title:</h>{problem.problem_name}</h1>
  
 
       
          <select onChange={e => {
              setLanguage(e.target.value);
            }}
             className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500">
            <option value='cpp'>C++</option>
            
            <option value='java'>Java</option>
          </select>
          <br />
          
          <div className="bg-gray-100 shadow-md w-full max-w-lg mb-4" style={{ height: '300px', overflowY: 'auto' }}>
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                outline: 'none',
                border: 'none',
                backgroundColor: '#f7fafc',
                height: '100%',
                overflowY: 'auto'
              }}
            />
          </div>
    
          <button onClick={handleSubmit} type="button" className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>
            Run
          </button>

          <button onClick={handleSubmitTestCase} type="button" className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>
            Submit
          </button>
          </div>

          <div className="rightbox mb-7">
          <div className="mb-1">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            rows='5'
            cols='15'
            value={input}
            placeholder='Input'
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
            style={{ minHeight: '100px' }}
          ></textarea>
        </div>
        {/* <label >
      Write your post:
      <textarea class="left-0 top-0"name="postContent" rows={4} cols={40} />
    </label> */}
        
          {output &&
            <div className="outputbox mt-3 bg-gray-100 rounded-md shadow-md p-4">
              <p style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
              }}>{output}</p>
            </div>
          }

          
</div>
        
        </div>
      );
    }



export default SolveProblem;