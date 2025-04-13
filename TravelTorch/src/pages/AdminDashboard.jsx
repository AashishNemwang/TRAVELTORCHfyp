import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faSuitcase,
  faCalendarCheck,
  faCreditCard,
  faStar,
  faBlog,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
  faEye,
  faPlus,
  faSearch,
  faFilter,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState({
    travelers: true,
    agencies: true,
    packages: true,
    stats: true
  });
  const [error, setError] = useState(null);
  
  // State for all data
  const [stats, setStats] = useState({
    travelers: 0,
    agencies: 0,
    packages: 0,
    bookings: 0,
    revenue: 0,
    reviews: 0
  });
  
  const [travelers, setTravelers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    travelers: '',
    agencies: '',
    packages: ''
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch travelers (users with role 'traveler')
        const travelersRes = await axios.get('/api/users?role=traveler');
        setTravelers(travelersRes.data);
        setLoading(prev => ({ ...prev, travelers: false }));
        
        // Fetch agencies (users with role 'agency')
        const agenciesRes = await axios.get('/api/users?role=agency');
        setAgencies(agenciesRes.data);
        setLoading(prev => ({ ...prev, agencies: false }));
        
        // Fetch packages
        const packagesRes = await axios.get('/api/travel_packages');
        setPackages(packagesRes.data);
        setLoading(prev => ({ ...prev, packages: false }));
        
        // Update stats
        setStats({
          travelers: travelersRes.data.length,
          agencies: agenciesRes.data.length,
          packages: packagesRes.data.length,
          bookings: 0, // You'll need to fetch these from your bookings table
          revenue: 0,  // You'll need to calculate this from payments
          reviews: 0   // You'll need to fetch these from reviews table
        });
        setLoading(prev => ({ ...prev, stats: false }));
        
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.message || 'Failed to fetch data');
        Object.keys(loading).forEach(key => {
          setLoading(prev => ({ ...prev, [key]: false }));
        }); 
      }
    };
    
    fetchData();
  }, []);

  // Filter functions
  const filteredTravelers = travelers.filter(traveler =>
    `${traveler.first_name} ${traveler.last_name}`.toLowerCase().includes(searchTerm.travelers.toLowerCase()) ||
    traveler.email.toLowerCase().includes(searchTerm.travelers.toLowerCase())
  );

  const filteredAgencies = agencies.filter(agency =>
    (agency.agency_name || `${agency.first_name} ${agency.last_name}`).toLowerCase().includes(searchTerm.agencies.toLowerCase()) ||
    agency.email.toLowerCase().includes(searchTerm.agencies.toLowerCase())
  );

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.packages.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.packages.toLowerCase())
  );

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      await axios.delete(`/api/${type}/${id}`);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
      
      // Refresh data
      if (type === 'users') {
        const res = await axios.get(`/api/users?role=${activeTab === 'travelers' ? 'traveler' : 'agency'}`);
        activeTab === 'travelers' ? setTravelers(res.data) : setAgencies(res.data);
      } else {
        const res = await axios.get('/api/travel_packages');
        setPackages(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to delete ${type}`);
    }
  };

  // Loading and error states
  if (error && !(filteredTravelers.length || filteredAgencies.length || filteredPackages.length)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  const renderDashboard = () => {
    if (loading.stats) {
      return (
        <div className="flex justify-center items-center h-64">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Travelers Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FontAwesomeIcon icon={faUsers} size="lg" />
              </div>
              <div>
                <p className="text-gray-500">Total Travelers</p>
                <p className="text-2xl font-bold">{stats.travelers}</p>
              </div>
            </div>
          </div>
          
          {/* Agencies Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FontAwesomeIcon icon={faUsers} size="lg" />
              </div>
              <div>
                <p className="text-gray-500">Travel Agencies</p>
                <p className="text-2xl font-bold">{stats.agencies}</p>
              </div>
            </div>
          </div>
          
          {/* Packages Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FontAwesomeIcon icon={faSuitcase} size="lg" />
              </div>
              <div>
                <p className="text-gray-500">Tour Packages</p>
                <p className="text-2xl font-bold">{stats.packages}</p>
              </div>
            </div>
          </div>
          
          {/* Other stats cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <FontAwesomeIcon icon={faCalendarCheck} size="lg" />
              </div>
              <div>
                <p className="text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.bookings}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <FontAwesomeIcon icon={faCreditCard} size="lg" />
              </div>
              <div>
                <p className="text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.revenue)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <FontAwesomeIcon icon={faStar} size="lg" />
              </div>
              <div>
                <p className="text-gray-500">Customer Reviews</p>
                <p className="text-2xl font-bold">{stats.reviews}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activities - Placeholder for now */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="text-center text-gray-500 py-8">
            Activity log will appear here once bookings are implemented
          </div>
        </div>
      </div>
    );
  };

  const renderTravelers = () => {
    if (loading.travelers) {
      return (
        <div className="flex justify-center items-center h-64">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Travelers</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search travelers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm.travelers}
              onChange={(e) => setSearchTerm({...searchTerm, travelers: e.target.value})}
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTravelers.length > 0 ? (
                filteredTravelers.map(traveler => (
                  <tr key={traveler.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{traveler.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {traveler.first_name} {traveler.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{traveler.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(traveler.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => {/* View details implementation */}}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button 
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                        onClick={() => {/* Edit implementation */}}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete('users', traveler.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm.travelers ? 'No matching travelers found' : 'No travelers available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderAgencies = () => {
    if (loading.agencies) {
      return (
        <div className="flex justify-center items-center h-64">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Travel Agencies</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search agencies..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm.agencies}
                onChange={(e) => setSearchTerm({...searchTerm, agencies: e.target.value})}
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              onClick={() => {/* Add agency implementation */}}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Agency
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map(agency => (
                  <tr key={agency.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {agency.agency_name || `${agency.first_name} ${agency.last_name}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(agency.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => {/* View details implementation */}}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button 
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                        onClick={() => {/* Edit implementation */}}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete('users', agency.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm.agencies ? 'No matching agencies found' : 'No agencies available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPackages = () => {
    if (loading.packages) {
      return (
        <div className="flex justify-center items-center h-64">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tour Packages</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search packages..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm.packages}
                onChange={(e) => setSearchTerm({...searchTerm, packages: e.target.value})}
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              onClick={() => {/* Add package implementation */}}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add Package
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.length > 0 ? (
                filteredPackages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(pkg.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.duration} days</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => {/* View details implementation */}}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button 
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                        onClick={() => {/* Edit implementation */}}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete('travel_packages', pkg.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm.packages ? 'No matching packages found' : 'No packages available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-gradient-to-br from-blue-600 to-indigo-800 text-white transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 border-b border-white border-opacity-10 flex items-center">
          <FontAwesomeIcon icon={faSuitcase} className="text-2xl" />
          {!sidebarCollapsed && <span className="ml-3 text-xl font-bold">Travel Admin</span>}
        </div>
        
        <nav className="mt-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'dashboard' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('travelers')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'travelers' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faUsers} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Travelers</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('agencies')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'agencies' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faUsers} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Agencies</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('packages')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'packages' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faSuitcase} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Packages</span>}
          </button>
          
          {/* Other sidebar items can be added later */}
        </nav>
        
        <button 
          onClick={toggleSidebar}
          className="absolute bottom-4 right-4 bg-white bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-opacity-20 transition-colors"
        >
          <FontAwesomeIcon icon={sidebarCollapsed ? faChevronRight : faChevronLeft} />
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'travelers' && 'Traveler Management'}
            {activeTab === 'agencies' && 'Travel Agency Management'}
            {activeTab === 'packages' && 'Tour Packages'}
          </h1>
          <div className="flex items-center">
            <span className="text-gray-600 mr-3">Admin User</span>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">AU</div>
          </div>
        </header>

        <div className="p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'travelers' && renderTravelers()}
          {activeTab === 'agencies' && renderAgencies()}
          {activeTab === 'packages' && renderPackages()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;