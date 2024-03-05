import React, { useEffect, useState } from 'react';


const ProductList=()=>{
    const [products,setProducts]=useState([]);

    useEffect(()=>{
      getProducts();
    },[])

    const getProducts=async()=>{
     let result= await fetch('http://localhost:8080/getAllProblems');
      result=await result.json();
      setProducts(result);
    }

    console.warn("products",products);
    return (
        <div>
         
          <div className="relative overflow-x-auto">
            <table className="mx-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                <th scope="col" className="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Problem Name
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {
                products.map((question, index) => {
                  return (
                    <tr
                      onClick={() => getProblemDescription(question)}
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {question.title}
                      </th>
                      <td className="px-6 py-4">{question.type}</td>
                      <td className="px-6 py-4">{question.difficulty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
           
          </div>
        </div>
      );
    }

export default ProductList;