import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

 const auth=localStorage.getItem('user');

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

  console.warn("products", products);
  return (
    <div className='product-list'>
      <h3 class="font-black" >Problems</h3>
      <ul>
        <li class='w-20 font-semibold'>S. No.</li>
        <li class="Problem-Name font-semibold" >Problem Title</li>
      </ul>
      {
        products.map((item, index) =>
          <ul>
            <li class='w-20'>{index + 1}</li>
            <li class="Problem-Name"><Link to={"/solveProblem/"+ item._id}>{item.problem_name}</Link></li>
          </ul>
        )
}
    </div>
  );
}

export default ProductList;