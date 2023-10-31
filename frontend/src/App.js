import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/dashboard';
import PhotoGallery from './pages/Gallery';
import About from './pages/About';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
