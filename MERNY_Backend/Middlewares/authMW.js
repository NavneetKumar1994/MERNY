const jwt= require('jsonwebtoken');
const secretKey= require('../Configs/authConfigs');
const User= require('../Models/UserModel');

verifyToken= (req,res,next)=>{

  let token= req.headers['authorization'];

  if(!token){
      return res.status(403).send('No token provided');
  }

  token = token.replace('Bearer ', '');

  jwt.verify(token,secretKey.secret,(err,decoded)=>{
      if(err){
          return res.status(401).send('Unauthorized');
      }

      req.email= decoded.id;
      next(); 
  });
  
}


// authenticateToken= async (req, res, next) => {
//     const token = req.headers['x-access-token'];
  
//     if (!token) {
//       return res.status(403).json({ msg: 'No token provided' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, secretKey);
//       const user = await User.findById(decoded.id);
  
//       if (!user) {
//         return res.status(401).json({ msg: 'Invalid token' });
//       }
  
//       // Set the user information in the request object
//       req.user = user;
//       next();
//     } catch (error) {
//       return res.status(401).json({ msg: 'Unauthorized' });
//     }
//   };

checkForUser= async (req,res,next)=>{
     const loggedUser= await User.findOne({
         email: req.email
     })
    
     if(loggedUser && loggedUser.email===req.params.email){
         next();
     }else{
         res.status(403).send({
             message:"Unauthorized"
         });   
     }
 } 

 const authCheck= {
     verifyToken:verifyToken,
    //  authenticateToken:authenticateToken,
     checkForUser:checkForUser,
 }
 
 module.exports= authCheck;