import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleSubmitPost = async () => {
    try {
      const response = await axios.post('http://localhost:8000/merny/api/v1/posts', {
        content,
        image,
        user:auth.user._id
      },
        {
          headers:{
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json', // Set content type header
          }
      });
      console.log('Post created successfully:', response.data);
      // You can do something after successful post creation, e.g., redirect to home
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <textarea
        placeholder="Enter your post here..."
        value={content}
        onChange={handlePostContentChange}
      />
      <button onClick={handleSubmitPost}>Submit</button>
    </div>
  );
};

export default CreatePost;
