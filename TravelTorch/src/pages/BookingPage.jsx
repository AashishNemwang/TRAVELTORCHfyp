import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Online Payment");
  const [userId] = useState(localStorage.getItem("userId")); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/packages/${packageId}`);
      setPackageDetails(response.data);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleBooking = async () => {
    if (!userId) {
      alert("You need to log in to book a package.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/bookings", {
        user_id: userId,
        package_id: packageId,
        payment_method: paymentMethod,
      });

      setMessage("Booking successful! Redirecting...");
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (error) {
      setMessage("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!packageDetails) return <p>Loading package details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4">{packageDetails.name}</h1>
      <img src={packageDetails.photo} alt={packageDetails.name} className="w-full h-60 object-cover rounded" />
      <p className="mt-2 text-gray-700">{packageDetails.description}</p>
      <p className="text-lg font-semibold mt-2">${packageDetails.price}</p>
      <p className="text-sm text-gray-500">Date: {packageDetails.date}</p>

      <div className="mt-4">
        <label className="block text-lg font-semibold">Payment Method:</label>
        <select
          className="w-full p-2 border rounded mt-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Online Payment">Online Payment</option>
          <option value="Cash on Spot">Cash on Spot</option>
        </select>
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white p-2 rounded w-full mt-4 hover:bg-blue-800 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>

      {message && <p className="text-center text-green-600 mt-3">{message}</p>}
    </div>
  );
};

export default BookingPage;
