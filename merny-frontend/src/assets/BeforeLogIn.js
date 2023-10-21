import React,{useState} from 'react'
import  Axios  from 'axios'
import Container from './Container'
import useAuth from '../context/UseAuth'
import { Link,useNavigate} from 'react-router-dom'


export default function BeforeLogIn({setLoggedIn}) {
     
     const {setAuth}= useAuth();
     const navigate= useNavigate();
   

     const [email,setEmail]= useState("")
     const [password,setPassword]= useState("")
     const [errMsg,setErrMsg]= useState('')

     
 
    async function handleSubmit(e){
       e.preventDefault()
 
       try{
         const response=  await Axios.post("http://localhost:8000/merny/auth/login",
         {email,password},
         {
          headers: {'Content-Type':'application/json'},
          withCredentials: true
         }) 



         const accessToken= response.data.access_token;
         const user= response.data.user;
         setAuth({email,password,accessToken,user});

         console.log(user);



         if(response.data && response.data.user.password){
          setLoggedIn(true);
          navigate('/');
        }else{
         setErrMsg('Incorrect password')
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
                alert("Error during Log in"+error)
           } 
       }
     }
 
      return (

     <>
         
          <Container wide={true} >
          <section >
    
        <div className="  row align-items-center" >
                   <div className=" col-lg-3  ">
                        <p className="lead text-muted"></p>
                   </div>
        <div className="col-lg-6" style={{backgroundColor:'aquamarine',padding:'10px 5px 10px 5px'}}>
            <form onSubmit={handleSubmit} style={{border:'1px solid black',padding:'100px 50px 100px 50px'}}> 
            <h1 style={{textAlign:'center',fontWeight:'bold'}}>MERNY</h1>        
               <div className="form-group">   
               <label htmlFor="username-register" className="lead text-muted mb-1" >
                   <small style={{fontWeight:'bold',color:'black'}}>Email</small>
               </label>                 
                   <input onChange={(e)=>setEmail(e.target.value)}  autoComplete='off' name="email" className="form-control  text-white bg-dark  border-danger font-weight-bold" type="text" value={email} placeholder="Email" required />
               </div>
    
               <div className="form-group" > 
               <label htmlFor="username-register" className="lead text-muted mb-1" >
                   <small style={{fontWeight:'bold',color:'black'}}>Password</small>
               </label>                    
                    <input onChange={(e)=>setPassword(e.target.value)} autoComplete='off' name="password" className="form-control  text-white bg-dark  border-danger font-weight-bold" type="password" value={password} placeholder="Password" required />
               </div >
    
               <div className="form-group">
                    <button onClick={handleSubmit} className="form-control text-white bg-dark font-weight-bold  border-danger mt-5"  > 
                    Login
                    </button>                          
               </div>  
               <div>
              <p>
                <Link to="/forgot-password" className='line' style={{fontWeight:'bold',color:'black'}}>Forgot Password?</Link>
              </p>
              </div>

                        <div>
                          <p style={{fontWeight:'bold',color:'black'}}> Don't have an Account?
                           <span className='line'>
                                   <Link to="/register" style={{color:'red',textDecoration:'none'}}> "Register Here"</Link>
                           </span>
                          </p>
                        </div>
           </form> 
    
          </div> 
    
                   <div className=" col-lg-3">
                        <p className="lead text-muted"></p>
                   </div>
    
          </div>    
        </section>
   </Container>

   </>

         
       )

}
