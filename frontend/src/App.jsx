import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter , Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="h-screen bg-slate-500">
      <BrowserRouter>
      <Nav/>
          <Routes>
          <Route path="/" element={<h1>Problems list</h1>}/>
            <Route path="/signup" element={<SignUp/>}/>
            
          </Routes>
            </BrowserRouter>
        </div>
    </>
  )
}

export default App;



