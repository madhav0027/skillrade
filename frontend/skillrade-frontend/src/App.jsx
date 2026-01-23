import './App.css'
import Login from './auth/Login'
import { AuthProvider } from './authcontext/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Navbar from './Components/Navbar'
import Register from './auth/Register'
import VerifyEmail from './auth/VerifyEmail'
import SkillSelector from './skills/skills'
import SkillForm from './skills/adminskill'
import About from './about/About'
import Learn from './Learn/Learn'
import Quiz from './quiz/quiz'
import Community from './community/Community'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
       <Navbar/>
        <Routes>
          <Route path='/community' element={<Community/>} />
          <Route path='/quiz' element={<Quiz/>}/>
          <Route path='/learn' element={<Learn/>}/>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/skills' element={<SkillSelector/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/verify' element={<VerifyEmail/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        <Routes>
          <Route path='/skilladmin' element={<SkillForm/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
