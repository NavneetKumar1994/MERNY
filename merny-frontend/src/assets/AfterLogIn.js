import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/AfterLogIn.css'
import '../styles/UserIcon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import NotificationIcon from '../components/Notifications/NotificationIcon';



export default function AfterLogIn({setLoggedIn}) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
   

     
  const navigate= useNavigate();

  const handleSignOut= ()=>{
    navigate('/login')
     setLoggedIn(false);
}  
  
  function onClickHomeIcon(){
    navigate('/home')
  }



  return (
     <>

<header className="header-bar">
      <div className="header-content">
        <div className="header-left">
          <span className="logo">
               <h1>MERNY</h1>
          </span>
        </div>
        <div className="header-center">
        <input type="text" placeholder="Enter to Search" className="search-input"/>        
        </div>
        <div className="header-right" style={{color:'white'}}>
        <FontAwesomeIcon icon={faHome} className="icon" onClick={onClickHomeIcon} />
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        <NotificationIcon/>

        <div className="user-icon" >
              <FontAwesomeIcon icon={faUser} className="icon" onClick={toggleDropdown} />
                   {isDropdownOpen && (
                       <div className="dropdown-content">
                            <Link to="/profile" className='link'>Profile</Link>
                       <div onClick={handleSignOut}>
                           <Link to='/login' className='link'>Logout </Link>                          
                       </div>         
                       </div>
                   )}
        </div>

    

        </div>
      </div>
    </header>
     </>

  )
}



