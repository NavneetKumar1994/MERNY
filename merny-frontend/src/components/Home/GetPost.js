import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Home.css'
import AuthContext from '../../context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import CreatePostPopUp from './CreatePostPopUp'; // Assuming CreatePostPopup component is defined
import { Link } from 'react-router-dom';

const GetPosts = () => {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [user,setUser]= useState();
  const [isDropdownOpen, setIsDropdownOisDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOisDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const user= auth.user;
    setUser(user);
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts', {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const sortedPosts = response.data.posts.reverse();
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [auth]);

  const handleEditPost = (post) => {
    if (post.content || post.images) {
      setSelectedPost(post);
    } else {
      alert('Post content or images cannot be null.');
    }
  };
  
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  

  return (
    <div>
      {posts.length === 0 ? (
        <h5 style={{ textAlign: 'center', opacity: '0.5' }}>There are no posts to show</h5>
      ) : (
        posts.map((post, index) => (
          <div key={index} style={{backgroundColor:'aquamarine',margin:'1%',paddingBottom:'1%',border:'1px solid green',borderRadius:'30px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'0 3% 0 1%'}}>
              <p><img src={user.avatar} alt="img" style={{height:'50px',width:'50px',border:'1px solid white',borderRadius:'50%',backgroundColor:'grey'}} />{user.username}</p>
              <FontAwesomeIcon icon={faEllipsisH} className="ellipsi-H" style={{ cursor: 'pointer' }} onClick={toggleDropdown}/>
                  {isDropdownOpen && (
                      <div >
                      <Link to="/editPost" className='link'>Edit Post</Link>
                      <Link to='/removePost' className='link'>Remove Post</Link> 
                      <Link to='/copyLink' className='link'>Copy Link</Link>                          
                         
                 </div>
                    )}                      
          </div>
            <p>{post.content}</p>
            <p><img src={post.images} alt="post-image" style={{width:'100%',height:'600px'}}  /></p>
           <div>


            {/* Like button */}
            <img src="https://icon-library.com/images/heart-shape-icon/heart-shape-icon-6.jpg" alt="like" style={{width:'50px',height:'50px',cursor:'pointer',margin:'0 1% 0 1%',padding:'0'}} />

            {/* Comment button */}
            <img src="https://static.thenounproject.com/png/1314304-200.png" alt="comment" style={{width:'35px',height:'35px',cursor:'pointer',margin:'0 2% 0 1%',padding:'0'}}  />

            {/* Share button */}
            <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="share" style={{width:'30px',height:'30px',cursor:'pointer',margin:'0 1% 0 1%',padding:'0'}} />

            {/* Save button */}
            <img src="https://freepngimg.com/download/instagram/60239-like-icons-bookmark-button-computer-facebook-instagram.png" alt="save"  style={{width:'30px',height:'30px',cursor:'pointer',margin:'0 1% 0 75%',padding:'0'}} />

            
            </div>



            {/* Edit post button
            {auth.user._id === post.user._id && <button onClick={() => handleEditPost(post)}>Edit Post</button>} */}

            {/* Delete post button */}
            {/* {auth.user._id === post.user._id && <button onClick={() => handleDeletePost(post._id)}>Delete Post</button>} */}
          </div>
        ))
      )}

      {/* Edit post popup */}
      {selectedPost && <CreatePostPopUp onClose={() => setSelectedPost(null)} initialPost={selectedPost} />}
    </div>
  );
};

export default GetPosts;
