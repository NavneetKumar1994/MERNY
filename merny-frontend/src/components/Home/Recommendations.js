import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Recommendations = () => {
  const [user,setUser]= useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersOfMe, setFollowersOfMe] = useState([]);
  const [avatar,setAvatar]= useState('');

  const {auth}= useContext(AuthContext);

//   const handleFollow = (userId) => {
//     // Implement the logic to follow the user with the given userId
//     console.log('Followed user with ID:', userId);
//   };

  useEffect(() => {
     const fetchFollowers = async () => {
          try {
               // Assuming auth.user.followers is an array of user _ids
               const followerIds = auth.user.followers;
               setUser(auth.user);
               setAvatar(auth.user.avatar);
               // console.log(followerIds);
       
               // Make a request to fetch details of each follower
               const fetchUserDetails = followerIds.map(async (followerId) => {
                 const response = await Axios.get(`http://localhost:8000/merny/api/v1/${followerId}`,
                 {
                    headers:{
                         Authorization: `Bearer ${auth.accessToken}`
                       }
                 });
                  return (response.data.user);  // Assuming the name is a property of the user
               });
       
               // Wait for all requests to complete and get the names
               const followers = await Promise.all(fetchUserDetails);
               setFollowers(followers);
             } catch (error) {
               console.error('Error fetching follower names:', error);
             }
           };
       
           if (auth.user && auth.user.followers) {
             fetchFollowers();
           }
   }, [auth]);


  return (
    <div style={{color:'dodgerblue'}}>
         
        <div style={{display:'flex',alignItems:'center',marginTop:'1%'}}>
               <p style={{display:'flex',alignItems:'center'}}> 
                  <img src={user.avatar} style={{height:'70px',width:'70px',border:'1px solid white',borderRadius:'50%',backgroundColor:'grey'}}/>       
                  {user.username} <br />
                  {user.fullname}     
               </p>
        </div>

        <h5 style={{display:'flex',justifyContent:'space-between'}}>
          <p>Recommendations</p>
          <FontAwesomeIcon icon={faSyncAlt} className="refresh-icon mr-2" />
        </h5>
       <div>
          {followers.map((follower) => (
           <div key={follower.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',backgroundColor:'rgb(245, 250, 249)',padding:'0 10px 0 10px',margin:'0 5px 0 5px',borderBottom:'1px solid yellow'}}>
               <p style={{display:'flex',alignItems:'center'}}> 
                  <img src={follower.avatar} style={{height:'70px',width:'70px',border:'1px solid white',borderRadius:'50%',backgroundColor:'grey'}}/>       
                  {follower.username} <br />
                  {follower.fullname}     
               </p>
              <button style={{background:'transparent',border:'1px solid rgb(83, 204, 163)', padding:'8px', color:'rgb(83, 204, 163)',borderRadius:'5px',cursor:'pointer'}}>Follow</button>
            </div>
          ))}
      </div>

      {/*<div>
        <h3>Following:</h3>
        <ul>
          {following.map((followedUser) => (
            <li key={followedUser.id}>
              {followedUser.username}
              <button onClick={() => handleFollow(followedUser.id)}>Follow</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Followers of Me:</h3>
        <ul>
          {followersOfMe.map((followerOfMe) => (
            <li key={followerOfMe.id}>
              {followerOfMe.username}
              <button onClick={() => handleFollow(followerOfMe.id)}>Follow</button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Recommendations;
