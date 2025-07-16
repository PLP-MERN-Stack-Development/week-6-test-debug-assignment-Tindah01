import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/blogs', {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim())
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate(`/blogs/${response.data.data.blog._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="create-blog">
      <h1>Create New Blog Post</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlog;
