import { useEffect, useState } from "react";
import axios from "axios";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews/1") // Fetch reviews for a package
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews", err));
  }, []);

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Delete Review error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border p-4 mb-4 rounded shadow-lg">
            <p className="font-semibold">{review.username}</p>
            <p className="text-yellow-500">⭐ {review.rating} / 5</p>
            <p className="text-gray-700">{review.review_text}</p>
            <button onClick={() => deleteReview(review.id)} className="bg-red-500 text-white px-4 py-2 rounded w-full mt-2">Delete</button>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default AdminReviews;
