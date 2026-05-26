import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Academics from './pages/Academics';
import Achievements from './pages/Achievements';
import EventsNews from './pages/EventsNews';
import Gallery from './pages/Gallery';
import ClubsSocieties from './pages/ClubsSocieties';
import StudentLife from './pages/StudentLife';
import ContactUs from './pages/ContactUs';

// Admin & Dynamic Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DynamicPage from './pages/DynamicPage';

import './App.css';

// Scroll to top on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
        {/* Sticky Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/events" element={<EventsNews />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/clubs" element={<ClubsSocieties />} />
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Admin Portal & Dynamic Custom Pages */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pages/:slug" element={<DynamicPage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

