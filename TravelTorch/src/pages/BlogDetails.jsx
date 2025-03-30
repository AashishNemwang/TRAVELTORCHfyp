import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/blogs/${id}`);
      setBlog(res.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/blogs/${id}/comments`);
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !commentText) {
      alert("Please enter your name and a comment.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/admin/blogs/${id}/comments`, {
        user_name: userName,
        comment_text: commentText,
      });

      setUserName("");
      setCommentText("");
      fetchComments(); // Refresh comments after adding
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!blog) return <p className="text-center mt-6">Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>
      {blog.blog_img && (
        <img
          src={`http://localhost:5000${blog.blog_img}`}
          alt="Blog"
          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
        />
      )}
      <p className="text-gray-700">{blog.content}</p>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        
        {/* Comments List */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="bg-gray-100 p-3 rounded-lg mb-2">
              <p className="font-bold">{comment.user_name}</p>
              <p>{comment.comment_text}</p>
              <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded mb-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <textarea
            placeholder="Write a comment..."
            className="w-full p-2 border rounded mb-2"
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
  