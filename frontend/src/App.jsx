import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter , Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateCompmponent';

import Login from './components/Login';
import AddProblem from './components/AddProblem';
import ProductList from './components/ProductList'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <div >
      <BrowserRouter>
      <Nav/>
          <Routes>
          <Route path="/" element={<ProductList/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/addProblem" element={<AddProblem/>}/>
          
         
            
          </Routes>
            </BrowserRouter>
        </div>


    </>
  )
}

export default App;



