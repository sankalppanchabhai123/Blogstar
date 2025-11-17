import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'

// note that the Routes and Route must imported from the react-router package 
import { Routes, Route } from 'react-router'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="h-screen text-1xl " data-theme="coffee">
      <Routes>
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/contact" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
