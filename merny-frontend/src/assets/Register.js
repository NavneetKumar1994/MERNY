import React,{useState} from 'react'
import Container from './Container'
import Axios from 'axios'
import {BrowserRouter, Link} from 'react-router-dom';


export default function Register() {

    const [fullname,setFullname]= useState('')
    const [username,setUsername]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [confirmPassword,setConfirmPassword]=useState('');
    const [gender,setGender]= useState('');
      


    async function handleSubmit(e){
         e.preventDefault()

         try{

           if(password===confirmPassword){
             await Axios.post("http://localhost:8000/merny/auth/register",{fullname,username, email, password, confirmPassword,gender})
             alert("Successfully Register")
             //Now we will empty the input field
             setFullname('')
             setUsername('')
             setEmail('')
             setPassword('')
             setConfirmPassword('')
             setGender('')
           }else{
               alert('Password & confirmPassword not matched')
           }

         }catch(error){
             //the request was made but the respose is rejected
           if(error.request){
               alert("Error: No response received from the server")
           }
           //the request made but the service code returned an error code other than 2xx
          else if(error.response){
               alert("Error: "+ error.response.data.message)
          }else{
               alert("Error during Sign Up"+error)
          } 
         }
     }
  return (
     <>
     
     <Container wide={true}>
         <div className="row align-items-center">
               <div className="col-lg-3 py-3 py-md-5">
                    <p className="lead text-muted">
                    </p>
               </div>

               <div className="col-lg-6  py-lg-3 pb-3" style={{backgroundColor:'aquamarine'}}>
                    <form onSubmit={handleSubmit} style={{border:'1px solid black', padding:'10px 15px 40px 15px',backgroundColor:'aquamarine'}}>
                    <h1 style={{textAlign:'center',fontWeight:'bold'}}>MERNY</h1>        

                         <div className="form-group">
                              <label htmlFor="fullname" className="lead text-muted mb-1" >
                                   <small style={{fontWeight:'bold',color:'red'}}>Full Name</small>
                              </label>
                              <input value={fullname} onChange={e=>setFullname(e.target.value)} id="fullname-register" name="fullname" className="form-control text-white bg-dark border-light font-weight-bold" type="text" placeholder="Enter your Full Name" />
                         </div>


                         
                         <div className="form-group">
                              <label htmlFor="username-register" className="lead text-muted mb-1" >
                                   <small style={{fontWeight:'bold',color:'red'}}>User Name</small>
                              </label>
                              <input value={username} onChange={e=>setUsername(e.target.value)} id="username-register" name="username" className="form-control text-white bg-dark border-light font-weight-bold" type="text" placeholder="create a username"/>
                         </div>


                         <div className="form-group">
                              <label htmlFor="email-register" className="lead text-muted mb-1" >
                                   <small style={{fontWeight:'bold',color:'red'}}>Email address</small>
                              </label>
                              <input value={email} onChange={e=>setEmail(e.target.value)} id="email-register" name="email" className="form-control text-white bg-dark border-light font-weight-bold" type="email" placeholder="Enter your Email"/>
                         </div>


                         <div className="form-group">
                              <label htmlFor="password-register" className="lead text-muted mb-1" >
                                   <small style={{fontWeight:'bold',color:'red'}}>Password</small>
                              </label>
                              <input value={password} onChange={e=>setPassword(e.target.value)} id="password-register" name="password" className="form-control text-white bg-dark border-light font-weight-bold" type="password" placeholder="Create your Password"/>
                         </div>

                         <div className="form-group">
                              <label htmlFor="confirm-password" className="lead text-muted mb-1" >
                                   <small style={{fontWeight:'bold',color:'red'}}>Re-Enter Password</small>
                              </label>
                              <input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} id="confirm-password" name="confirmPassword" className="form-control text-white bg-dark border-light font-weight-bold" type="password" placeholder="Confirm your Password"/>
                         </div>

          <div style={{display:'flex',justifyContent:'space-evenly',fontWeight:'bold'}}>

               <div>
                  <label htmlFor="male">Male: </label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                  />
                </div>

               <div >
                  <label htmlFor="female">Female: </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                  />
                </div>
                <div>
                  <label htmlFor="other">Other: </label>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={() => setGender('other')}
                  />
                </div>
                        
          </div>


                        <button type="submit" className="btn btn-dark bt-lg btn-block text-danger font-weight-bold border-dark">Register</button>

                        <div>
                          <p style={{fontWeight:'bold',color:'black'}}> Already have an Account?
                           <span className='line'>
                                   <Link to="/login" style={{color:'red', textDecoration:'none'}}> Login Here</Link>
                           </span>
                          </p>
                        </div>
 
                    </form>
               </div>

               <div className="col-lg-3 py-3 py-md-5">
                    <p className="lead text-muted"></p>
               </div>

          </div>             
     </Container>
     </>
     )
}
