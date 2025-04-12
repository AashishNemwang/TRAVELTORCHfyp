import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/login.jpg'; // Make sure to have this image
import axios from "axios";
import { getContext } from '../components/Contextapi';

const LoginPage = () => {
  const {count,setCount}=getContext();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e) => {
    try{

      e.preventDefault();
      
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
  const response=await axios.post("http://localhost:5000/api/auth/login",formData,{withCredentials:true});
  console.log(response?.data?.user)
  if(response?.status===200){
    setCount(1);
    setLoading(true);
    alert(response?.data?.message);
    if(response?.data?.user?.role==='Traveler'){
      navigate('/travHome');
    }
    if(response?.data?.user?.role==='Agency'){
      navigate('/agencyDashboard');
    }
    if(response?.data?.user?.role==='Admin'){
      navigate('/adminDashboard');
    }
    setLoading(false);
    // navigate('/dashboard'); // Uncomment to redirect after login
  }
    }
    catch(error){
      // console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex w-full max-w-md bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Image Column - Hidden on mobile */}
        <div className="hidden sm:block sm:w-1/3 bg-blue-100">
          <img
            src={LoginImage}
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Column */}
        <div className="w-full sm:w-2/3 p-4">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Login</h2>
          
          {error && (
            <div className="mb-3 p-2 bg-red-50 text-red-600 rounded text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <button 
                type="button" 
                className="text-blue-600 hover:underline"
                onClick={() => alert('Password reset feature would go here')}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/signup')} 
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;