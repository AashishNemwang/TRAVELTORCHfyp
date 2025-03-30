import { useEffect, useState } from "react";
import axios from "axios";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews/all")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Traveler</th>
            <th className="border p-2">Package</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="border p-2">{review.traveler}</td>
              <td className="border p-2">{review.package}</td>
              <td className="border p-2">{review.rating}/5</td>
              <td className="border p-2">{review.review_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;
