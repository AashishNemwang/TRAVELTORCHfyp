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
  faChartLine,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
  faEye,
  faPlus,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
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
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    image: ''
  });

  // Mock data initialization
  useEffect(() => {
    // Stats
    setStats({
      travelers: 1245,
      agencies: 87,
      packages: 342,
      bookings: 892,
      revenue: 1254300,
      reviews: 567
    });

    // Travelers
    setTravelers([
      { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2023-01-15', bookings: 5 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2023-02-20', bookings: 3 },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joined: '2023-03-10', bookings: 7 }
    ]);

    // Agencies
    setAgencies([
      { id: 1, name: 'Adventure Tours', email: 'contact@adventure.com', packages: 12, since: '2022-05-10' },
      { id: 2, name: 'Luxury Travel Co.', email: 'info@luxurytravel.com', packages: 8, since: '2022-08-15' },
      { id: 3, name: 'Budget Trips', email: 'support@budgettrips.com', packages: 15, since: '2023-01-05' }
    ]);

    // Packages
    setPackages([
      { id: 1, name: 'Bali Adventure', agency: 'Adventure Tours', price: 1200, duration: '7 days', bookings: 45 },
      { id: 2, name: 'Paris Luxury', agency: 'Luxury Travel Co.', price: 2500, duration: '5 days', bookings: 28 },
      { id: 3, name: 'Thailand Budget', agency: 'Budget Trips', price: 800, duration: '10 days', bookings: 62 }
    ]);

    // Bookings
    setBookings([
      { id: 1, traveler: 'John Doe', package: 'Bali Adventure', date: '2023-06-15', status: 'Confirmed', amount: 1200 },
      { id: 2, traveler: 'Jane Smith', package: 'Paris Luxury', date: '2023-07-10', status: 'Completed', amount: 2500 },
      { id: 3, traveler: 'Robert Johnson', package: 'Thailand Budget', date: '2023-08-05', status: 'Pending', amount: 800 }
    ]);

    // Payments
    setPayments([
      { id: 1, booking: 'Bali Adventure', traveler: 'John Doe', amount: 1200, date: '2023-06-10', method: 'Credit Card' },
      { id: 2, booking: 'Paris Luxury', traveler: 'Jane Smith', amount: 2500, date: '2023-07-05', method: 'PayPal' },
      { id: 3, booking: 'Thailand Budget', traveler: 'Robert Johnson', amount: 800, date: '2023-07-30', method: 'Bank Transfer' }
    ]);

    // Reviews
    setReviews([
      { id: 1, traveler: 'John Doe', package: 'Bali Adventure', rating: 5, comment: 'Amazing experience!', date: '2023-06-25' },
      { id: 2, traveler: 'Jane Smith', package: 'Paris Luxury', rating: 4, comment: 'Great service but rooms could be better', date: '2023-07-20' },
      { id: 3, traveler: 'Robert Johnson', package: 'Thailand Budget', rating: 3, comment: 'Good for the price', date: '2023-08-15' }
    ]);

    // Blogs
    setBlogs([
      { id: 1, title: 'Top 10 Destinations for 2023', date: '2023-01-10', views: 1245 },
      { id: 2, title: 'Traveling on a Budget', date: '2023-03-15', views: 892 },
      { id: 3, title: 'Luxury Resorts Worth the Splurge', date: '2023-05-20', views: 1567 }
    ]);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlogPost = {
      id: blogs.length + 1,
      title: newBlog.title,
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setBlogs([...blogs, newBlogPost]);
    setNewBlog({ title: '', content: '', image: '' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map(booking => (
              <div key={booking.id} className="flex items-center p-3 border-b border-gray-100">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <FontAwesomeIcon icon={faCalendarCheck} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{booking.traveler} booked {booking.package}</p>
                  <p className="text-sm text-gray-500">{booking.date} • {formatCurrency(booking.amount)}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTravelers = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Travelers</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search travelers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {travelers.map(traveler => (
                <tr key={traveler.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{traveler.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{traveler.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{traveler.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{traveler.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{traveler.bookings}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {travelers.length} of {travelers.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAgencies = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Travel Agencies</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Agency
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agencies.map(agency => (
                <tr key={agency.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agency.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.packages}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agency.since}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPackages = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tour Packages</h2>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search packages..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.agency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(pkg.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.bookings}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderBookings = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Filter by Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <FontAwesomeIcon icon={faFilter} className="absolute right-3 top-3 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traveler</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.traveler}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.package}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(booking.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPayments = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Payments</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search payments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traveler</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.booking}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.traveler}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Customer Reviews</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {reviews.map(review => (
              <div key={review.id} className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      {review.traveler.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{review.traveler}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon 
                            key={i} 
                            icon={faStar} 
                            className={`${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} h-4 w-4`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                    <div className="mt-2 flex space-x-3">
                      <button className="text-sm text-blue-600 hover:text-blue-800">Reply</button>
                      <button className="text-sm text-gray-500 hover:text-gray-700">Report</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderBlogs = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Blog Posts</h2>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              onClick={() => setActiveTab('addBlog')}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add New Post
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blog.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.views}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAddBlog = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Blog Post</h2>
        <form onSubmit={handleBlogSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newBlog.title}
              onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              value={newBlog.content}
              onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setActiveTab('blogs')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Publish Post
            </button>
          </div>
        </form>
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
          
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'bookings' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faCalendarCheck} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Bookings</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('payments')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'payments' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faCreditCard} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Payments</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'reviews' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faStar} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Reviews</span>}
          </button>
          
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center p-3 mx-2 rounded-md transition-colors w-full ${sidebarCollapsed ? 'justify-center' : ''} ${activeTab === 'blogs' || activeTab === 'addBlog' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
          >
            <FontAwesomeIcon icon={faBlog} className="text-lg" />
            {!sidebarCollapsed && <span className="ml-3">Blog</span>}
          </button>
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
            {activeTab === 'bookings' && 'Booking Management'}
            {activeTab === 'payments' && 'Payment Records'}
            {activeTab === 'reviews' && 'Customer Reviews'}
            {activeTab === 'blogs' && 'Blog Management'}
            {activeTab === 'addBlog' && 'Add New Blog Post'}
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
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'reviews' && renderReviews()}
          {activeTab === 'blogs' && renderBlogs()}
          {activeTab === 'addBlog' && renderAddBlog()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;