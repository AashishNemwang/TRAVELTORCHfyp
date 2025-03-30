import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TravelerBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/blogs");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Travel Blogs</h1>
      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.blog_id} className="p-4 border rounded shadow">
              {blog.blog_img && (
                <img
                  src={`http://localhost:5000${blog.blog_img}`}
                  alt="Blog"
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-600 line-clamp-2">{blog.content.substring(0, 100)}...</p>
              <Link
                to={`/blogs/${blog.blog_id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default TravelerBlogs;
