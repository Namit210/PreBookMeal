import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import BookingForm from './BookingForm'
import Rule from './Rules'
import Footer from './Footer'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'
import './language-support/i18n.jsx'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<BookingForm />} />
        <Route path='/help' element={<Rule />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        {/* Admin panel and dashboard routes removed */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
