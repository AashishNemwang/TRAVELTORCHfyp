import { useEffect, useState } from "react";
import axios from "axios";

const Reviews = ({ packageId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/reviews/${packageId}`);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const addReview = async () => {
    try {
      await axios.post("http://localhost:5000/api/reviews", 
        { package_id: packageId, rating, comment }, 
        { withCredentials: true }
      );
      fetchReviews();
      setRating(5);
      setComment("");
    } catch (error) {
      console.error("Error adding review", error);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded shadow-lg">
      <h2 className="text-xl font-semibold">Traveler Reviews</h2>

      {/* Add Review Form */}
      <div className="mt-4">
        <select 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          className="border p-2 w-full"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        <textarea 
          placeholder="Write your review..." value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          className="border p-2 w-full mt-2"
        ></textarea>
        <button 
          onClick={addReview} 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit Review
        </button>
      </div>

      {/* Review List */}
      <div className="mt-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded shadow-lg my-2">
              <h3 className="font-semibold">{review.username}</h3>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
