import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import { Button } from "@material-tailwind/react";


    
const ProductList = () => {
  const api_url=import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  let userId = JSON.parse(localStorage.getItem("user"));
  console.log(userId);
      userId = userId.user._id;
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let result = await fetch(`${api_url}/getAllProblems`);
    result = await result.json();
    setProducts(result.problems);
  }

  const deleteProblem=async(id)=>{
    console.warn("uu",userId);
    let result = await fetch(`${api_url}/problem/${id}/${userId}`,{
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
        <li class='w-40 font-semibold'>Operation</li>
      </ul>
      {
        products.map((item, index) =>
          <ul>
            <li class='w-20'>{index + 1}</li>
            <li class="Problem-Name"><Link to={"/solveProblem/"+ item._id}>{item.problem_name}</Link></li>
           
              <li class='w-40' > {item.userId===userId ?(<button class="bg-red-700 hover:bg-red-700-700 text-white 
              font-semibold py-0 px-1 border border-red-100-300 rounded" onClick={()=>deleteProblem(item._id)}>
  DELETE
</button>):(<button class="bg-red-400 hover:bg-red-700-700 text-white 
              font-semibold py-0 px-1 border border-red-100-300 rounded" onClick={()=>deleteProblem(item._id)}>
  DELETE
</button>)}
{ item.userId===userId ?(
<Link class="bg-blue-500 bg-blue-500  text-white font-semibold py-0 px-1 rounded" to={"/update/"+item._id+"/"+userId}>Update</Link>
):(<Link class="bg-blue-500 bg-blue-500  text-white font-semibold py-0 px-1 rounded pointer-events-none opacity-50 cursor-not-allowed" to="/problems">Update</Link>)}

</li>
          
           
            
          </ul>
        )
}
    </div>
  );
}

export default ProductList;