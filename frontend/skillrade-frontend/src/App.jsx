import './App.css'
import Login from './auth/Login'
import { AuthProvider } from './authcontext/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Navbar from './Components/Navbar'
import Register from './auth/Register'
import VerifyEmail from './auth/VerifyEmail'


function App() {

  return (
    <AuthProvider>
     <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/verify' element={<VerifyEmail/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
