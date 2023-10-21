import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import '../../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';

const CreatePostPopup = ({ onClose }) => {
  const { auth } = useContext(AuthContext);
  const username = auth.user.username;
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCameraAccess = async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({ video: true });
      // Use the stream for your purposes (e.g., display in a video element)
    } catch (error) {
      alert('Error accessing camera:', error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImages([...images, e.target.result]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((image, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmitPost = async () => {

    
    try {
      const response = await axios.post(
        'http://localhost:8000/posts',
        {
          content,
          images,
          user: auth.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!content && images.length === 0) {
        alert('Please enter post content or upload an image.');
        return; // Stop further execution
      }
  
      alert('Post created successfully:');
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data.message : error.message);
    }
    onClose();
  };

  useEffect(() => {
    document.body.classList.add('popup-visible');

    return () => {
      document.body.classList.remove('popup-visible');
    };
  }, []);

  return (
    <div className="create-post-popup">
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid rgb(239, 237, 237)' }}>
        <h4>Create Post</h4>
        <h4 onClick={onClose} style={{ cursor: 'pointer' }}>
          X
        </h4>
      </div>
      <textarea
        className="text-area-input"
        placeholder={`Hi, ${username}, What's on your mind?`}
        value={content}
        onChange={handleContentChange}
        style={{
          backgroundImage: 'url("https://emojis.wiki/thumbs/emojis/smiling-face-with-smiling-eyes.webp")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '50px',
          backgroundPosition: 'bottom right',
          paddingRight: '30px',
        }}
      />
      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <FontAwesomeIcon icon={faCamera} className="icon" onClick={handleCameraAccess} />
          <label htmlFor="fileInput" className="custom-file-upload">
            <FontAwesomeIcon icon={faImage} className="icon" />
          </label>
          <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
        </div>

        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-preview-item">
              <img src={image} alt={`Image ${index}`} />
              <button className="close-button" onClick={() => handleRemoveImage(index)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleSubmitPost} className="form-control text-light font-weight-bold bg-secondary border-secondary mt-3">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
