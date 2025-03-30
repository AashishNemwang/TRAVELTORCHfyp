import { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/booking/all")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Traveler</th>
            <th className="border p-2">Package</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.traveler}</td>
              <td className="border p-2">{booking.package}</td>
              <td className="border p-2">${booking.price}</td>
              <td className="border p-2">{booking.payment_status} ({booking.payment_method})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
