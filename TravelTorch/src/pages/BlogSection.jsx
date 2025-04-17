// components/BlogSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogSection = ({ blogPosts }) => {
  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Travel Blog</h2>
      <p className="text-center mb-8 max-w-2xl mx-auto">Read our latest travel tips, destination guides, and adventure stories to inspire your next trip.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt || post.content.substring(0, 100)}...</p>
              <p className="text-gray-400 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
              <Link to={`/blog/${post.id}`} className="mt-4 text-green-600 hover:text-green-800 font-medium inline-block">Read More →</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/blog" className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition">
          View All Blog Posts
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
