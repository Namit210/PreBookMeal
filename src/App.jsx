import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import BookingForm from './BookingForm'
import Rule from './Rules'
import BookingConfirmation from './confirmation'
import Footer from './Footer'
import Dashboard from './Dashboard'
import AdminLogin from './AdminLogin'
import ProtectedRoute from './ProtectedRoute'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<BookingForm />} />
        <Route path='/help' element={<Rule />} />
        <Route path='/confirm' element={<BookingConfirmation />} />
        <Route path='/admin-panel' element={<AdminLogin />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/dashboard/*' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
