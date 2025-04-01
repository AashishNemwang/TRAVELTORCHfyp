import { useEffect, useState } from "react";
import axios from "axios";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const addBlog = async () => {
    try {
      await axios.post("http://localhost:5000/api/blogs", 
        { title, description, image_url: imageUrl }, 
        { withCredentials: true }
      );
      fetchBlogs();
      setTitle("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding blog", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, { withCredentials: true });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Manage Blogs</h1>

      {/* Add Blog Form */}
      <div className="mt-6 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-semibold">Add New Blog</h2>
        <input 
          type="text" placeholder="Title" value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 w-full mt-2"
        />
        <textarea 
          placeholder="Description" value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-2 w-full mt-2"
        ></textarea>
        <input 
          type="text" placeholder="Image URL" value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          className="border p-2 w-full mt-2"
        />
        <button 
          onClick={addBlog} 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Blog
        </button>
      </div>

      {/* Blog List */}
      <h2 className="text-2xl font-semibold mt-8">All Blogs</h2>
      <div className="mt-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="border p-4 rounded shadow-lg my-2">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-700">{blog.description}</p>
              {blog.image_url && <img src={blog.image_url} alt="Blog" className="w-full h-40 object-cover mt-2" />}
              <button 
                onClick={() => deleteBlog(blog.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
