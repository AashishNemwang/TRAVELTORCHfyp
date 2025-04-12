import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { getContext } from './Contextapi';
import axios from 'axios';


const NavBar = ({func=()=>{}}) => {
    const navigate=useNavigate();
   const {user,setUser}=getContext();
   const handleLogout=async()=>{
    try{
    const response=await axios.delete('http://localhost:5000/api/auth/logout',{withCredentials:true});
    if(response?.status===200){
      setCount(1);
      alert(response?.data?.message);
    }
    }catch(error){
      alert(error?.response?.data?.message);
    }
   }
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 text-white py-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">TravelTorch</h1>
          <div className="space-x-4 flex font-semibold text-lg">
            <button onClick={() => navigate('/')} className=" text-white px-4 py-2 rounded hover:bg-gray-600 ">Home</button>
            <button onClick={func} className=" text-white px-4 py-2 rounded hover:bg-gray-600 ">Packages</button>
            <button onClick={() => navigate('/contact')} className=" text-white px-4 py-2 rounded hover:bg-gray-600">Contact</button>
            {
             !user &&
            <Link to="/login" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-white hover:text-gray-600
            ">Login</Link>
            }
            {
             user &&
            <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-white hover:text-gray-600
            ">Log out</button>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
