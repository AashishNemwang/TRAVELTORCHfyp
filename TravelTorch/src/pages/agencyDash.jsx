import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AgencyDash = () => {
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('packages');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data and packages on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data first
        const userResponse = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true
        });
        setUser(userResponse.data);

        // Then fetch packages using the agency_id from the user response
        const packagesResponse = await axios.get(`http://localhost:5000/api/packages/agency/${userResponse.data._id}`, {
          withCredentials: true
        });
        setPackages(packagesResponse.data);
      } catch (error) {
        toast.error('Failed to load data');
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Load bookings only when 'bookings' tab is active
  useEffect(() => {
    if (activeTab === 'bookings' && user) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/bookings/agency/${user._id}`, {
            withCredentials: true
          });
          setBookings(response.data);
        } catch (error) {
          toast.error('Failed to load bookings');
        }
      };
      fetchBookings();
    }
  }, [activeTab, user]);

  // ... rest of the component remains the same ...
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleDeletePackage = async (packageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/${packageId}`, {
        withCredentials: true
      });
      toast.success('Package deleted successfully');
      setPackages(packages.filter(pkg => pkg._id !== packageId));
    } catch (error) {
      toast.error('Failed to delete package');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, { status }, {
        withCredentials: true
      });
      toast.success('Booking status updated');
      setBookings(bookings.map(b =>
        b._id === bookingId ? { ...b, status } : b
      ));
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user ? user.name : 'Agency User'}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'packages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Packages
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 text-sm font-medium ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Bookings
            </button>
          </nav>
        </div>

        {/* Tab Panels */}
        {activeTab === 'packages' ? (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">My Travel Packages</h2>
              <button
                onClick={() => navigate('/createPackage')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Create Package
              </button>
            </div>

            {packages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p>No packages yet. Create your first package!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <div key={pkg._id} className="border rounded-lg shadow hover:shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      {pkg.photo ? (
                        <img
                          src={`http://localhost:5000/uploads/${pkg.photo}`}
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">Location: {pkg.destination}</p>
                      <p className="text-sm text-gray-600">Price: ${pkg.price}</p>
                      <p className="text-sm text-gray-600">Duration: {pkg.duration} days</p>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{pkg.description}</p>
                      <div className="flex justify-between">
                        <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">
                          {pkg.bookings ? pkg.bookings.length : 0} bookings
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/agency/packages/edit/${pkg._id}`)}
                            className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this package?')) {
                                handleDeletePackage(pkg._id);
                              }
                            }}
                            className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Bookings</h2>
            {bookings.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p>No bookings yet for your packages.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{booking.package?.name || 'Package deleted'}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {booking.user?.name || 'User deleted'} ({booking.user?.email || 'N/A'})
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {booking.status !== 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                              className="text-green-600 hover:underline mr-3"
                            >
                              Confirm
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                              className="text-red-600 hover:underline"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AgencyDash;