import { useEffect, useState } from "react";
import axios from "axios";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs", err));
  }, []);

  const addBlog = async () => {
    if (!title || !content) return alert("Title and content are required!");

    try {
      const res = await axios.post("http://localhost:5000/api/blogs/add", {
        title,
        content,
        image_url: imageUrl,
      });

      alert(res.data.message);
      setTitle("");
      setContent("");
      setImageUrl("");
      setBlogs([...blogs, { title, content, image_url: imageUrl }]);
    } catch (error) {
      console.error("Blog error:", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete Blog error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      <div className="border p-4 mb-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold">Add a New Blog</h2>
        <input type="text" className="border p-2 w-full mt-2" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="border p-2 w-full mt-2" rows="3" placeholder="Blog Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="text" className="border p-2 w-full mt-2" placeholder="Image URL (Optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <button onClick={addBlog} className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2">Add Blog</button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="border p-4 mb-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            {blog.image_url && <img src={blog.image_url} alt="Blog" className="w-full h-60 object-cover my-3 rounded" />}
            <p className="text-gray-700">{blog.content}</p>
            <button onClick={() => deleteBlog(blog.id)} className="bg-red-500 text-white px-4 py-2 rounded w-full mt-2">Delete</button>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default AdminBlogs;
