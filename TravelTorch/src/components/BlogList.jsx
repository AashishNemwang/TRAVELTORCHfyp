import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

const BlogList = ({ blogs, refProp }) => {
  return (
    <section ref={refProp} className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
              <img
                src={blog.image ? `http://localhost:5000/uploads/blogs/${blog.image}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{formatDate(blog.created_at)}</span>
                {blog.author_name && (
                  <span className="text-sm font-medium text-gray-700">By {blog.author_name}</span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
              <Link 
                to={`/blog/${blog.id}`} 
                className="inline-block text-blue-600 font-medium hover:text-blue-800 transition"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;