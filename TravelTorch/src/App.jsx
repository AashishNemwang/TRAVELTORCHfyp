import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TravHome from './pages/TravHome';
import AgencyDash from './pages/AgencyDash';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogs from "./pages/AdminBlogs";
import TravelerBlogs from "./pages/TravelerBlogs";
import BlogDetails from "./pages/BlogDetails";




const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Traveler Home */}
        <Route path="/travhome" element={<TravHome />} /> 

        <Route path="/AgencyDash" element={<AgencyDash />} />


        {/* Signup Page */}
        <Route path="/signup" element={<SignupPage />} /> 

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/book/:packageId" element={<BookingPage />} />
        
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/blogs" element={<AdminBlogs />} />

        <Route path="/blogs" element={<TravelerBlogs />} />

        <Route path="/blogs/:id" element={<BlogDetails />} />
      </Routes>
        

    </Router>
  );
};

export default App;
