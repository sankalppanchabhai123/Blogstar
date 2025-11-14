import './App.css'
import Signup from './pages/Signup'

// note that the Routes and Route must imported from the react-router package 
import { Routes, Route } from 'react-router'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="h-screen text-1xl " data-theme="coffee">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/about" element={<Login />} />
        <Route path="/contact" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
