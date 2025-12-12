import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import BookingForm from './BookingForm'
import Rule from './Rules'
import BookingConfirmation from './confirmation'
import Footer from './Footer'
import Dashboard from './Dashboard'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<BookingForm />} />
        <Route path='/help' element={<Rule />} />
        <Route path='/confirm' element={<BookingConfirmation />} />
        <Route path='/dashboard/*' element={<Dashboard />}/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
