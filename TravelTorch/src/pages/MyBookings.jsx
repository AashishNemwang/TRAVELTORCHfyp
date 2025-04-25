import { useState, useEffect } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [userId] = useState(localStorage.getItem("userId")); 

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{booking.package_name}</h2>
              <p className="text-gray-600">Price: ${booking.price}</p>
              <p className="text-gray-500">Payment: {booking.payment_method}</p>
              <p className="text-gray-500">Status: {booking.status}</p>
              <p className="text-sm text-gray-400">Booked on: {new Date(booking.booking_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
