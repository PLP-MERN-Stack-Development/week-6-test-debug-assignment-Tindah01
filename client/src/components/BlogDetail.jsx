import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/blogs/${id}`);
        setBlog(response.data.data.blog);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.response?.status === 404) {
          navigate('/not-found');
        }
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <p className="author">By {blog.author.username}</p>
      <p className="date">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="content">{blog.content}</div>
      <div className="tags">
        {blog.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
