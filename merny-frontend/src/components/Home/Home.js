import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import CreatePostPopup from './CreatePostPopUp'; // Component for creating a post
import Recommendations from './Recommendations';
import '../../styles/Home.css'
import Container from '../../assets/Container'
import GetPosts from './GetPost';

const Home = () => {
  // State to manage the visibility of the create post popup
  const {auth}= useContext(AuthContext);
  const [isCreatePostPopupVisible, setCreatePostPopupVisible] = React.useState(false);
  const [username,setUsername]= useState('');
  const [avatar,setAvatar]= useState('');

  // Handler to toggle the visibility of the create post popup
  const toggleCreatePostPopup = () => {
    setCreatePostPopupVisible(!isCreatePostPopupVisible);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/merny/api/v1/${auth.user._id}`,{
          headers:{
            Authorization: `Bearer ${auth.accessToken}`
          }
        });
        setUsername(auth.user.username);
        setAvatar(auth.user.avatar);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUser();
  }, [auth]);



  return (
     
    <>
    {/* <Container wide={false}> */}
      <section >

  <div style={{display:'flex',flexWrap:'wrap'}}>

    <div style={{display:'block',width:'68%',marginLeft:'1%',marginTop:'1%'}}>
      <div  className="border create-post-bar pr-2 ">
      {/* User profile picture */}
      {/* ... render user profile picture here */}
      <div>
      <img src={avatar} style={{height:'50px',width:'50px',border:'1px solid white',borderRadius:'50%',backgroundColor:'grey'}}/> 
      </div>

      {/* Bar to create a new post */}
      <div  onClick={toggleCreatePostPopup} style={{ width: '100%' }}>
        <div >
          {/* <span className="user-name">{user}</span> */}
          <input
            type="text"
            className="user-post-input"
            placeholder= {`${username}, What are you thinking?`}/>
        </div>
      </div>
    </div> 

        <div className="display-post" style={{ minHeight: '80vh', overflowY: 'auto', maxHeight: '79vh' ,padding:'0 2px 0 20px'}}>
             {/* Add content for the box here */}
              <GetPosts/>
        </div>

     </div>


  

       <div  className="recommendations-bar">
         <div>
            <Recommendations/>
         </div>
      </div> 

      </div>     
</section>

            <div className='post-pop-up'>
              {/* Create Post Popup */}
              {isCreatePostPopupVisible && <CreatePostPopup onClose={toggleCreatePostPopup} />}
         {/* Feed to display posts */}
        {/* ... render the feed to display posts here */}  
             </div>
    {/* </Container> */}
    </>
  );
};

export default Home;
