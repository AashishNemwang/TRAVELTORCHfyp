import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/admin/${activeTab}`, {
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data. Check console for details.");
      setLoading(false);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'packages' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Packages
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'blogs' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Blogs
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Reviews
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {data.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="py-2 px-4 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(item).map((value, i) => (
                      <td key={i} className="py-2 px-4">
                        {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;