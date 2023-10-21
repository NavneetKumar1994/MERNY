import React,{useState} from 'react'
import BeforeLogIn from './BeforeLogIn'
import AfterLogIn from './AfterLogIn'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Register'
import Profile from '../components/Profile/Profile'
import Home from '../components/Home/Home'




export default function LandingPage() {
     
     const[loggedIn,setLoggedIn]= useState(false);

     return (
      <>
         {loggedIn
         ?
         <>        
        <BrowserRouter>
        <header>
         <AfterLogIn setLoggedIn={setLoggedIn} style={{ display: 'flex', alignItems: 'center' }}/>
         </header>
         <Routes>
          <Route path='/home' element={<Home/>} />
          {/* <Route path='/profile' element={<Profile/>}/> */}
         </Routes>
         </BrowserRouter>
         </>
        
         :
         <>
        
        <BrowserRouter>
         <header>
            <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', border:'2px solid',backgroundColor:'aquamarine',padding:'15px 0 15px 0' }}>
            <h1>CAPSTONE PROJECT</h1>
             </div>
         </header>
         <Routes>
            <Route path='/login' element={<BeforeLogIn setLoggedIn={setLoggedIn}/> } />
            <Route path='/*' element={<BeforeLogIn setLoggedIn={setLoggedIn}/> } />
            <Route path= '/register' element={<Register/>}/>
         </Routes>
         </BrowserRouter>

         </>
      }     
      </>
     )
   
}
