import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';

function App() {
  const [count, setCount] = useState(0)

  return <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<h1>Register</h1>} />
    </Routes>
  </Router>
}

export default App
