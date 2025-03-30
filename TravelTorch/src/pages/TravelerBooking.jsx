import { useState, useEffect } from "react";
import axios from "axios";

const TravelerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [travelerId] = useState(1); // Replace with actual logged-in traveler ID

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/traveler/bookings/${travelerId}`);
      setBookings(res.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>
      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.booking_id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-bold">{booking.package_name}</h3>
              <p className="text-gray-600">Price: ${booking.price}</p>
              <p className="text-gray-700">Payment Method: {booking.payment_method}</p>
              <p className="font-bold text-green-600">
                Status: {booking.payment_status === "paid" ? "Paid ✅" : "Pending ❌"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default TravelerBookings;
