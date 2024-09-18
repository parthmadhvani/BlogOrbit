import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();

  let currentUrl = window.location.href;

        // Create a new URL object based on the current URL
        let url = new URL(currentUrl);

        // Set the port to 8000
        url.port = '8080';
        let baseUrl = `${url.protocol}//${url.hostname}:${url.port}`;

        let urlToHit = baseUrl +'/api/blog-posts'

  useEffect(() => {
    axios.get(urlToHit)
      .then(response => {
        console.log("userID:", userId);
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the blogs!', error);
      });
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openBlog = (id) => {
    console.log(id);
    navigate(`/blog-detail/${id}`, { state: { userId: userId } });
  };

  const addNewBlog = () => {
    navigate('/add-blog', { state: { userId: userId } });
  };

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">BLOGS</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, content, or author..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 w-80 md:w-96"
            />
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <div key={blog.id} className="text-left max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{blog.title}</h5>
                <p className="mb-3 font-normal text-gray-700">{blog.content.substring(0, 100)}...</p>
                <p className="mb-3 font-normal text-gray-500">By {blog.author.name}</p>
                <button
                  onClick={() => openBlog(blog.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                >
                  Show More
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available.</p>
          )}
        </div>
      </div>
      <button
        onClick={addNewBlog}
        className="fixed bottom-8 right-8 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors flex items-center justify-center"
      >
        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Blog
      </button>
    </div>
  );
};

export default BlogList;
