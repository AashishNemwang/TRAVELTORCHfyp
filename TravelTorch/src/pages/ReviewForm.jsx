import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ packageId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const submitReview = async () => {
    try {
      await axios.post("http://localhost:5000/api/reviews/add", {
        package_id: packageId,
        rating,
        review_text: reviewText
      }, { withCredentials: true });

      alert("Review submitted!");
      setRating(5);
      setReviewText("");
      onReviewAdded(); // Refresh the reviews list
    } catch (error) {
      console.error("Review error:", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow-lg mt-4">
      <h2 className="text-xl font-semibold">Leave a Review</h2>
      <select value={rating} onChange={(e) => setRating(e.target.value)} className="border p-2 w-full mt-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} Stars</option>
        ))}
      </select>
      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your review..." className="border p-2 w-full mt-2"></textarea>
      <button onClick={submitReview} className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2">Submit</button>
    </div>
  );
};

export default ReviewForm;
