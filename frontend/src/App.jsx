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
import ProductList from './components/ProductList';
import SolveProblem from './components/SolveProblem';
import Home from './components/Home'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <div >
      <BrowserRouter>
      <Nav/>
          <Routes>

          <Route element={<PrivateComponent/>}>

          <Route path="/" element={<Home/>}/>
          <Route path="/problems" element={<ProductList/>}/>
           
            <Route path="/login" element={<Login/>}/>
            <Route path="/addProblem" element={<AddProblem/>}/>
            <Route path="/solveProblem/:id" element={<SolveProblem/>}/>
            <Route path="/logout" element={<h1>Logout</h1>}/>
          </Route>

            <Route path="/signup" element={<SignUp/>}/>
            
          </Routes>
            </BrowserRouter>
        </div>


    </>
  )
}

export default App;



