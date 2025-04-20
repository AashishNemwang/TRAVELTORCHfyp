import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TravHome from './pages/TravHome';
import AgencyDash from './pages/AgencyDash';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import BookingPage from "./pages/PackageBooking";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogs from "./pages/AdminBlogs";
// import Testimonial from './components/ui/Testimonial';
// import TravelerBlogs from "./pages/TravelerBlogs";
// import BlogDetails from "./pages/BlogDetails";
import axios from 'axios';
import { getContext } from './components/Contextapi';
import CreatePackage from './pages/CreatePackage';
import Testimonial from './components/ui/Testimonial';




const App = () => {

  const {user,setUser,count,setCount}=getContext();
  const getUser=async()=>{
    try{
      const res=await axios.get("http://localhost:5000/api/auth/loggedInUser",{withCredentials:true});
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
    if(!user){
      getUser();
    }
  },[count,setCount]);
  return (
    <Router>

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Traveler Home */}
        <Route path="/travhome" element={<TravHome />} /> 

        <Route path="/agencyDash" element={<AgencyDash />} />


        {/* Signup Page */}
        <Route path="/signup" element={<SignupPage />} /> 

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/book/:packageId" element={<BookingPage />} />

        <Route path="/createPackage" element={<CreatePackage/>} />
        
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/testim" element={<MyBookings />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/admin/blogs" element={<AdminBlogs />} />

        {/* <Route path="/blogs" element={<TravelerBlogs />} /> */}

        {/* <Route path="/blogs/:id" element={<BlogDetails />} /> */}
      </Routes>
        

    </Router>
  );
};

export default App;
