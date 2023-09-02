import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [postIdFilter, setPostIdFilter] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Post ko fetch karne kai liye
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=100');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Comment ko fetch karne kai liye
    const fetchComments = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=1000');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPosts();
    fetchComments();
  }, []);

  const handlePostClick = (post) => {
    // comments ko filter karne kai liye post id use karenge
    const postComments = comments.filter((comment) => comment.postId === post.id);
    setSelectedPost({ ...post, comments: postComments });
  };

    // posts ko filter karne kai liye post id use karenge
    const filteredPosts = postIdFilter
    ? posts.filter((post) => post.id === parseInt(postIdFilter, 10))
    : posts;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Post Viewer</h1>
      </header>
      <div className="filter-container">
        <label htmlFor="postIdFilter">Filter by Post ID:</label>
        <select id="postIdFilter" value={postIdFilter} onChange={(e) => setPostIdFilter(e.target.value)}>
          <option value="">All</option>
          {posts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        </select>
      </div>

      <div className="post-comments-container">
        <div className="left-side">
          {/*  Posts */}
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`post ${selectedPost && selectedPost.id === post.id ? 'selected' : ''}`}
              onClick={() => handlePostClick(post)}
            >
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>

        <div className="right-side">
        
          {selectedPost && (
            <div className="comment-list">
              <h2>Comments for Post: {selectedPost.title}</h2>
              <ul>
                {selectedPost.comments.map((comment) => (
                  <li key={comment.id}>{comment.body}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
