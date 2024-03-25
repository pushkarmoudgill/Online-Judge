import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import { Button } from "@material-tailwind/react";

let userId = JSON.parse(localStorage.getItem("user"));
    userId = userId.user._id;
    
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let result = await fetch('http://localhost:8080/getAllProblems');
    result = await result.json();
    setProducts(result.problems);
  }

  const deleteProblem=async(id)=>{
    console.warn("uu",userId);
    let result = await fetch(`http://localhost:8080/problem/${id}/${userId}`,{
     method:"Delete"
    });
    result=await result.json();
    console.warn("flag",result.flag);

    if(result.flag==="true"){
      getProducts();
    }
    else{
      alert("You can't Delete another Peer's Problems")
    }

  }

  console.warn("products", products);
  return (
    <div className='product-list '>
                   <h1 class=' mb-1 font-bold text-pink-900 text-[48px] '>Give And Learn</h1>

      <h3 class="font-black" >Problems</h3>
      <ul>
        <li class='w-20 font-semibold'>S. No.</li>
        <li class="Problem-Name font-semibold" >Problem Title</li>
        <li class='w-20 font-semibold'>Operation</li>
      </ul>
      {
        products.map((item, index) =>
          <ul>
            <li class='w-20'>{index + 1}</li>
            <li class="Problem-Name"><Link to={"/solveProblem/"+ item._id}>{item.problem_name}</Link></li>
           
              <li  > <button class="bg-red-700 hover:bg-red-700-700 text-white 
              font-semibold py-0 px-1 border border-red-100-300 rounded" onClick={()=>deleteProblem(item._id)}>
  DELETE
</button></li>
          
           
            
          </ul>
        )
}
    </div>
  );
}

export default ProductList;