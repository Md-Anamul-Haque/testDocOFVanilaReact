import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Card from './components/Card'
import Admin from './pages/admin'
import AdminDoc from './pages/admin.doc'
import Doc from './pages/doc'
import Home from './pages/home'
import SignIn from './pages/signIn'

function App() {
  // axios.interceptors.request.use(function (config) {
  //   config.withCredentials = true;
  //   config.baseURL = import.meta.env.VITE_API_URL;
  //   return config;
  // });
  useEffect(() => {

  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/:doc_id" element={<Doc />} />
      <Route path="/admin/:doc_id" element={<AdminDoc />} />
      <Route path="*" element={<Card>NOt Found - 404</Card>} />
    </Routes>
  )
}

export default App
