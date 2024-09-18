import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorId: '',
    likes: 0,
    views: 0,
  });
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      authorId: userId,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      let currentUrl = window.location.href;

        // Create a new URL object based on the current URL
        let url = new URL(currentUrl);

        // Set the port to 8000
        url.port = '8080';
        let baseUrl = `${url.protocol}//${url.hostname}:${url.port}`;
      const response = await axios.post(baseUrl+'/api/blog-posts', formData);
      alert('Blog post added successfully!');
      navigate('/blogs',{state: {userId: userId}});  // Redirect to the blog list page
      setFormData({
        title: '',
        content: '',
        authorId: '',
        likes: 0,
        views: 0,
      });
    } catch (error) {
      alert('There was an error adding the blog post.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">BLOGS</h1>
        </div>
      </header>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          {message && <div className="mb-4 text-sm text-center">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700"
            >
              Add Blog Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
