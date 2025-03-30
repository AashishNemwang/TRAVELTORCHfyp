import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PackageDetails = () => {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const travelerId = localStorage.getItem("user_id");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/packages/${packageId}`)
      .then((res) => setPackageData(res.data))
      .catch((err) => console.error("Error fetching package", err));

    axios.get(`http://localhost:5000/api/reviews/${packageId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews", err));
  }, [packageId]);

  const submitReview = async () => {
    if (!reviewText) return alert("Review cannot be empty!");

    try {
      const res = await axios.post("http://localhost:5000/api/reviews/add", {
        traveler_id: travelerId,
        package_id: packageId,
        rating,
        review_text: reviewText,
      });

      alert(res.data.message);
      setReviewText("");
      setRating(5);
      setReviews([...reviews, { traveler: "You", rating, review_text: reviewText }]);
    } catch (error) {
      console.error("Review error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold">{packageData.name}</h1>
      <p className="text-gray-600">{packageData.description}</p>
      <p className="text-lg font-semibold">Price: ${packageData.price}</p>

      <h2 className="text-xl font-semibold mt-6">Traveler Reviews</h2>
      <div className="border p-4 mt-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>{review.traveler}</strong> rated {review.rating}/5</p>
              <p>{review.review_text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-6">Leave a Review</h2>
      <div className="border p-4 mt-4">
        <select className="border p-2 w-full" value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>{num} Stars</option>
          ))}
        </select>
        <textarea className="border p-2 w-full mt-2" rows="3" placeholder="Write a review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
        <button onClick={submitReview} className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2">Submit Review</button>
      </div>
    </div>
  );
};

export default PackageDetails;
