import React, { useState, useEffect } from "react";
import { Card, CardContent}  from "../components/ui/card";
import  Button  from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard");
      const data = await res.json();
      setStats(data.stats);
      setPackages(data.packages);
      setBookings(data.bookings);
      setReviews(data.reviews);
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/packages/${id}`, { method: "DELETE" });
      setPackages(packages.filter(pkg => pkg.id !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Packages</h2>
            <p className="text-2xl">{stats.totalPackages || 0}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl">{stats.totalBookings || 0}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Reviews</h2>
            <p className="text-2xl">{stats.totalReviews || 0}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Blogs</h2>
            <p className="text-2xl">{stats.totalBlogs || 0}</p>
          </CardContent>
        </Card>
      </div>

      
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-3">Manage Travel Packages</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Package</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg.id} className="border">
                <td className="p-2 border">{pkg.name}</td>
                <td className="p-2 border">${pkg.price}</td>
                <td className="p-2 border">{pkg.date}</td>
                <td className="p-2 border">
                  <Button className="mr-2 bg-blue-500" onClick={() => navigate(`/edit-package/${pkg.id}`)}>Edit</Button>
                  <Button className="bg-red-500" onClick={() => handleDeletePackage(pkg.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-3">Recent Bookings</h2>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map(booking => (
                  <li key={booking.id} className="border-b p-2">
                    {booking.travelerName} booked {booking.packageName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings yet</p>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-3">Recent Reviews</h2>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map(review => (
                  <li key={review.id} className="border-b p-2">
                    {review.travelerName}: {review.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      
      <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-bold mb-3">Manage Blogs</h2>
        <Button className="bg-green-500 mb-4" onClick={() => navigate("/add-blog")}>Add New Blog</Button>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map(blog => (
              <li key={blog.id} className="border-b p-2 flex justify-between">
                <span>{blog.title}</span>
                <Button className="bg-red-500" onClick={() => console.log("Delete blog", blog.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      
      \
      <div className="bg-white p-4 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-bold mb-3">Statistics Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: "Packages", value: stats.totalPackages || 0 },
            { name: "Bookings", value: stats.totalBookings || 0 },
            { name: "Reviews", value: stats.totalReviews || 0 },
            { name: "Blogs", value: stats.totalBlogs || 0 },
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
