import React, { useState } from 'react';

const notifications = [
  { type: 'follow', message: 'Someone followed you' },
  { type: 'like', message: 'Someone liked your post' },

  
];

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <div style={{width:'300px',color:'black'}}>

      <h3 style={{borderBottom:'2px solid black'}}>Notification</h3>

        {notifications.map((notification, index) => (
          <p key={index} onClick={() => handleNotificationClick(notification)} >
            {notification.message}
          </p>
        ))}
      {/* {selectedNotification && (
        <div>
          <h3>Notification Details</h3>
          <p>{selectedNotification.message}</p>
        </div>
      )} */}
    </div>
  );
};

export default Notifications;















// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import AuthContext from '../../context/AuthProvider';

// const Notifications = () => {
//   const { auth } = useContext(AuthContext);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/notifications', {
//           headers: {
//             Authorization: `Bearer ${auth.accessToken}`
//           }
//         });

//         console.log(response.data);

//         setNotifications(response.data.notifications); // Assuming notifications is an array of objects

//       } catch (error) {
//         if (error.request) {
//           console.error("Error: No response received from the server");
//         } else if (error.response) {
//           console.error("Error: " + error.response.data.message);
//         } else {
//           console.error("Error during fetching notifications: " + error);
//         }
//       }
//     }

//     fetchNotifications();
//   }, [auth]);

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <ul>
//         {notifications.map((notification) => (
//           <li key={notification.id}>{notification.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
