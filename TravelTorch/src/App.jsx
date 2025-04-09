import React, { useEffect } from 'react';
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
import axios from 'axios';
import { getContext } from './components/Contextapi';




const App = () => {

  const {user,setUser}=getContext();
  const token=localStorage.getItem('token');
  const getUser=async()=>{
    try{
      const res=await axios.post("http://localhost:5000/api/auth/getLoginUser",{token:token},{withCredentials:true});
      if(res?.status===200){
        //console.log(res?.data?.user)
        setUser(res?.data?.user);
      }
    }
    catch(error){
      console.log(error);
    } 
  }
  useEffect(()=>{
    if(token){
      getUser();
    }
  },[user ]);
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
