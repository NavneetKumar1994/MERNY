const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretConfig = require('../Configs/authConfigs');

exports.signup = async (req, res) => {
  const { fullname, username, email, password, gender } = req.body;

  try {
    // Check whether username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "This username already exists." });
    }

    // Check whether email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "This email is already taken." });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    // Check email format
    const emailFormat = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (!email.match(emailFormat)) {
      return res.status(400).json({ error: "Email format is incorrect." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender
    });

    // Generate JWT token
    const accessToken= jwt.sign({id: user.email},
      secretConfig.secret,
       {expiresIn:'1h'});

   const refreshToken=jwt.sign(
       {id:user.email},
       secretConfig.secret,{expiresIn:'1d'}
   );
   user.refreshToken= refreshToken;
   const result= await user.save();
   // console.log(result);
   res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',
   maxAge:24*60*60*10000})

    // Prepare the response
    const response = {
      msg: "Register Success!",
      access_token: accessToken,
      user: {
        avatar: "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
        role: "user",
        gender,
        mobile: "",
        address: "",
        story: "",
        website: "",
        followers: [],
        following: [],
        saved: [],
        ...user._doc  // Include all user properties
      }
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.login = async(req,res)=>{
  const user= await User.findOne({email:req.body.email});
  if(!user){
    return res.status(400).send({Message: "This Email does not exist"});
  }

  if(!bcrypt.compareSync(req.body.password,user.password)){
    return res.status(200).send("Password is incorrect");
  }

  const accessToken= jwt.sign({id:user.email},
    secretConfig.secret,
    {expiresIn:'1d'});

    const refreshToken=jwt.sign(
      {id:user.email},
      secretConfig.secret,{expiresIn:'30d'}
  );
        user.refreshToken= refreshToken;
        const result= await user.save();
        // console.log(result);
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',
        maxAge:24*60*60*10000});


        const response = {
          msg: "Login Success!",
          access_token: accessToken,
          user: {
            avatar: "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
            role: "user",
            mobile: "",
            address: "",
            story: "",
            website: "",
            followers: [],
            following: [],
            saved: [],
            ...user._doc  // Include all user properties
          }
        };
        res.status(200).send(response);
}


exports.logout= async(req,res)=>{
  const user= await User.findOne({email:req.body.email});
  if(!bcrypt.compareSync(req.body.password,user.password)){
    return res.status(200).send("Password is incorrect");
  }
  res.status(200).json({
    msg:"Logged Out"
  })
}