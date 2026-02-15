import './App.css'
import Login from './auth/Login'
import { AuthProvider } from './authcontext/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Navbar from './Components/Navbar'
import Register from './auth/Register'
import VerifyEmail from './auth/VerifyEmail'
import SkillSelector from './skills/Skills'
import SkillForm from './skills/adminskill'
import About from './about/About'
import Learn from './Learn/Learn'
import Quiz from './quiz/Quiz'
import Community from './community/Community'
import Settings from './settings/Settings'
import ThankYou from './about/Thankyou'
import HomePage from './HomePage/Homepage'

function App() {

  const token = localStorage.getItem("token")

  return (
    <div className='min-h-screen flex flex-col'>
      <AuthProvider>
        <BrowserRouter>
        <Navbar/>
        <main className='mt-18'>
          <Routes>
            <Route path='/login' element={token  ? <Dashboard/> : <Login/>} />
            <Route path='/register' element={token ? <Dashboard/> :<Register/>}/>
            <Route path="/" element={<HomePage/>} />
            <Route path="/settings" element={<Settings/>}/>
            <Route path='/community' element={<Community/>} />
            <Route path='/quiz' element={<Quiz/>}/>
            <Route path='/learn' element={<Learn/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/skills' element={<SkillSelector/>}/>
            <Route path='/verify' element={<VerifyEmail/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/thank-you' element={<ThankYou/>}/>
          </Routes>
          <Routes>
            <Route path='/skilladmin' element={<SkillForm/>}/>
          </Routes>
        </main>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
