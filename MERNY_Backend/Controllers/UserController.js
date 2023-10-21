const User= require('../Models/UserModel');
const mongoose= require('mongoose')

exports.findAll= async(req,res)=>{

     try {
          // Fetch user details
          const users = await User.find({}, 'avatar _id fullname username');
    
          // Prepare the response in the specified format
          const response = {
            users: users.map(user => ({
              avatar: user.avatar || "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
              _id: user._id,
              fullname: user.fullname,
              username: user.username
            }))
          };
    
          // Send the response
          res.status(200).json(response);
        } catch (error) {
          console.error("Error while searching users:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
}


exports.findById= async (req,res)=>{

     const userId = req.params.id;

    // Validate the user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Cast to ObjectId failed for value \"" + userId + "\" at path \"_id\" for model \"user\"" });
    }
     
     try {
          // Fetch user details by ID
          const user = await User.findById(userId);
    
          if (!user) {
            return res.status(404).json({ msg: "User not found." });
          }
    
          // Prepare the response in the specified format
          const response = {
            user: {
              avatar: user.avatar || "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
              role: user.role,
              gender: user.gender,
              mobile: user.mobile,
              address: user.address,
              story: user.story,
              website: user.website,
              followers: user.followers,
              following: user.following,
              saved: user.saved,
              _id: user._id,
              fullname: user.fullname,
              username: user.username,
              email: user.email,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              __v: user.__v
            }
          };
    
          // Send the response
          res.status(200).json(response);
        } catch (error) {
          console.error("Error while getting user by ID:", error);
          res.status(500).json({ msg: "Internal Server Error" });
        }
}


exports.updateUser= async (req,res)=>{

  const emailId = req.params.email;

  try{
    const user= await User.findOne({email:emailId});
   // console.log(user.email);

    if(!user){
        return res.status(200).send(`${emailId} does not exist in system`);
    }

      user.fullname= req.body.fullname ? req.body.fullname: user.fullname;
    user.avatar= req.body.avatar ? req.body.avatar: user.avatar;
    user.mobile= req.body.mobile ? req.body.mobile: user.mobile;
    user.story= req.body.story ? req.body.story: user.story;
    user.gender= req.body.gender ? req.body.gender: user.gender;
    user.website= req.body.website ? req.body.website: user.website;

    //updating now
    user.fullname= req.body.fullname ? req.body.fullname: user.fullname;
    user.avatar= req.body.avatar ? req.body.avatar: user.avatar;
    user.mobile= req.body.mobile ? req.body.mobile: user.mobile;
    user.story= req.body.story ? req.body.story: user.story;
    user.gender= req.body.gender ? req.body.gender: user.gender;
    user.website= req.body.website ? req.body.website: user.website;

    const newUser= await user.save();

      return res.status(200).json({ msg: "Update Success!" });
    } catch (error) {
      console.error("Error while updating user:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
}


exports.followbyId= async(req,res)=>{

       const emailId= req.email; //loggedin user's Id;
       const followUserId= req.params.id;

       try{
        const loggedInUser= await User.findOne({email:emailId});
       // console.log(loggedInUser);
        const userId= loggedInUser._id;
        //console.log(userId);
        const userToFollow= await User.findById(followUserId);
        //console.log(userToFollow);

        // Check if the user to follow exists
        if(!userToFollow){
          return res.status(500).json({"msg": `Cast to ObjectId failed for value ${followUserId} at path ${userId} for model ${loggedInUser.username}`});
        }

        if (!loggedInUser) {
          return res.status(404).json({ msg: 'User not found.' });
        }
        
        // Check if the logged-in user is already following the user
        if(loggedInUser.following.includes(followUserId)){
          return res.status(200).json({msg:'You followed this user'});
        }

        // Update logged-in user's following list
      loggedInUser.following.push(followUserId);
      await loggedInUser.save();

      // Update user to follow's followers list
      userToFollow.followers.push(userId);
      await userToFollow.save();

        const newUser= await User.findById(userId).populate({
          path: 'following',
          select: '_id'  // Select only the _id field
        });
        

        return res.status(200).json({newUser});

       }catch(err){
        console.error("Error while following user:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
       }

}

exports.unFollowById= async(req,res)=>{

  const emailId= req.email; //loggedin user's Id;
  const unFollowUserId= req.params.id;

       try{
        const loggedInUser= await User.findOne({email:emailId});
       // console.log(loggedInUser);
        const userId= loggedInUser._id;
        //console.log(userId);
        const userToUnFollow= await User.findById(unFollowUserId);
        //console.log(userToFollow);

        // Check if the user to follow exists
        if(!userToUnFollow){
          return res.status(500).json({"msg": `Cast to ObjectId failed for value ${unFollowUserId} at path ${userId} for model ${loggedInUser.username}`});
        }

        if (!loggedInUser) {
          return res.status(404).json({ msg: 'User not found.' });
        }
        
        // Check if the logged-in user is already following the user
        if(loggedInUser.following.includes(!unFollowUserId)){
          return res.status(200).json({msg:'You are not following this user'});
        }

        // Update logged-in user's following list
      loggedInUser.following.pull(unFollowUserId);
      await loggedInUser.save();

      // Update user to follow's followers list
      userToUnFollow.followers.pull(userId);
      await userToUnFollow.save();

        const newUser= await User.findById(userId).populate({
          path: 'following',
          select: '_id'  // Select only the _id field
        });
        

        return res.status(200).json({newUser});

       }catch(err){
        console.error("Error while following user:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
       }

}

exports.userSuggestions= async(req,res)=>{

  const emaiId= req.email;
  const user= await User.findOne({email:emaiId});
  
  try {
    // Get the logged-in user's following and followers
    const loggedInUser = await User.findById(user._id).populate('following followers', '_id fullname username avatar email createdAt');    
    //console.log(loggedInUser);

    // Get the user details for all followers and following (including the logged-in user)
    const users = [...loggedInUser.following, ...loggedInUser.followers, loggedInUser];

    // Format the response
    const response = {
      users,
      result: users.length
    };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting user suggestions:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}

