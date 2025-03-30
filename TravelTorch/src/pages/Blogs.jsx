import { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Travel Blogs</h1>
      
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="border p-4 mb-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            {blog.image_url && <img src={blog.image_url} alt="Blog" className="w-full h-60 object-cover my-3 rounded" />}
            <p className="text-gray-700">{blog.content}</p>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default Blogs;
