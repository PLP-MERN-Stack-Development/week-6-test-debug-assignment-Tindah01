import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/blogs');
        setBlogs(response.data.data.blogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      {blogs.map(blog => (
        <div key={blog._id} className="blog-card">
          <h2>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </h2>
          <p className="author">By {blog.author.username}</p>
          <p className="date">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div className="tags">
            {blog.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
