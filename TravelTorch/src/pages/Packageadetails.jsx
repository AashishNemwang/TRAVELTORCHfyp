import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

const PackageDetails = () => {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/packages/${packageId}`)
      .then((res) => setPackageData(res.data))
      .catch((err) => console.error("Error fetching package", err));

    fetchReviews();
  }, [packageId]);

  const fetchReviews = () => {
    axios.get(`http://localhost:5000/api/reviews/${packageId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews", err));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {packageData ? (
        <>
          <h1 className="text-3xl font-bold">{packageData.name}</h1>
          <p className="text-gray-700 mt-2">{packageData.description}</p>
          <p className="font-semibold mt-2">Price: ${packageData.price}</p>
          <img src={packageData.photo} alt={packageData.name} className="w-full h-64 object-cover rounded my-4" />

          <h2 className="text-2xl font-semibold mt-6">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border p-4 my-2 rounded shadow-lg">
                <p className="font-semibold">{review.username} - {review.rating} ⭐</p>
                <p className="text-gray-700">{review.review_text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          <ReviewForm packageId={packageId} onReviewAdded={fetchReviews} />
        </>
      ) : (
        <p>Loading package details...</p>
      )}
    </div>
  );
};

export default PackageDetails;
