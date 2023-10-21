const Post = require('../Models/PostModel');
const User= require('../Models/UserModel')

exports.createPost= async(req,res)=>{
     const emaiId= req.email;
     const user= await User.findOne({email:emaiId});
     //console.log(user);

     try {
          // Extract the required parameters from the request body
          const { content, images } = req.body;
          //const userId = user._id; // Assuming you have middleware that sets req.user
      
          // Create a new post
          const newPost = new Post({
            content,
            images,
            user
          });
      
          // Save the post to the database
          await newPost.save();
         // console.log(newPost.user._id);
      
          // Return the details of the added post
          res.status(201).json({
            msg: 'Created Post!',
            newPost,
          });
        } catch (error) {
          console.error('Error creating post:', error);
          res.status(500).json({ msg: 'Internal Server Error' });
        }
}


exports.getPosts= async(req,res)=>{
    
     const emaiId= req.email;
     const user= await User.findOne({email:emaiId});

     try {
          // Retrieve all posts for the logged-in user
          
          const posts = await Post.find().populate('user', 'avatar followers _id fullname username');
          //console.log(user._id);
          
      
          const response = {
            msg: 'Success!',
            result: posts.length,
            posts,
          };
      
          res.status(200).json(response);
        } catch (error) {
          console.error('Error getting posts:', error);
          res.status(500).json({ msg: 'Internal Server Error' });
        }

}

exports.updatePostById= async(req,res)=>{

     const {content,images}= req.body;
     const postId= req.params.id;

     try{
          const updatedPost= await Post.findByIdAndUpdate(
               postId,
               {content,images},
               {new:true} // to return updatedPost
          );
          if(!updatedPost){
               return res.status(400).json({msg:'Post not found'});
          }

          res.status(200).json({
               msg:'Updated Post!',
               newPost: updatedPost
          })

     }catch(err){
          console.error('Error updating post:', err);
          res.status(500).json({ msg: 'Internal Server Error' });
     }
}

exports.getPostById= async (req,res)=>{

     const postIdReq= req.params.id;

     try{
          const post= await Post.findById(postIdReq).populate('user','avatar followers _id fullname username');
          if(!post){
               return res.status(400).json({msg:`No post with id: ${postIdReq}`});
          }

          res.status(200).send({
               post: post
          });

     }catch(err){
          console.error('Error updating post:', err);
          res.status(500).json({ msg: 'Internal Server Error' });

     }
}


exports.deletePost = async (req, res) => {

     const emailId= req.email;
     const user= await User.findOne({email:emailId});
     const postId = req.params.id;
   
     try {
       // Check if the post exists
       const post = await Post.findById(postId);
       if (!post) {
         return res.status(404).json({ msg: 'Post not found' });
       }
   
       // Check if the logged-in user is the owner of the post
       if (post.user.toString() !== user._id.toString()) {
         return res.status(403).json({ msg: 'Unauthorized to delete this post' });
       }
   
       // Delete the post
       await Post.findByIdAndDelete(postId);
   
       res.status(204).json(); // Successful deletion, no content to return
     } catch (error) {
       console.error('Error deleting post:', error);
       res.status(500).json({ msg: 'Internal Server Error' });
     }
   };


   exports.likePostById= async(req,res)=>{

     const emailId= req.email;
     const user= await User.findOne({email:emailId});

     const postId= req.params.id;

     try{
          const post= await Post.findById(postId);
          if(!post){
               return res.status(400).send({msg:'This post does not exist'});
          }

          //if post is already liked by user;
          if(post.likes.includes(user._id)){
               return res.status(200).json({msg:'One like allowed per User'})
          }

           post.likes.push(user._id);
           await post.save();
           
           res.status(200).json({
               msg:'Liked Post'
           })

     }catch(error){
          if (error.kind === 'ObjectId') {
               return res.status(400).json({ msg: `Cast to ObjectId failed for value ${postId} at path \"_id\" for model \"post\""` });
           }
           console.error('Error liking post:', error);
           return res.status(500).json({ msg: 'Internal Server Error' })

     }
   }


   exports.UnlikePostById= async(req,res)=>{

     const user= await User.findOne({email:req.email});
     //console.log(user)
     const postId= req.params.id;

     try{
          const post= await Post.findById(postId);
          if(!post){
               return res.status(404).json({msg:'This post does not exist'})
          }

          if(!post.likes.includes(user._id)){
               return res.status(404).json({msg:'Not liked yet'});
          }

          post.likes.pull(user._id);
          await post.save();

          return res.status(200).json({
               msg:'Unliked Post'
            })     
     }catch(error){
          if (error.kind === 'ObjectId') {
               return res.status(400).json({ msg: `Cast to ObjectId failed for value ${postId} at path \"_id\" for model \"post\""` });
           }
           console.error('Error liking post:', error);
           return res.status(500).json({ msg: 'Internal Server Error' })
     }
   }



   exports.userPostsByUserId= async(req,res)=>{

     try{
          // Retrieve all posts for the specified user
          const posts= await Post.find({user:req.params.id});
          // Return the posts
          const response= {
               posts,
               result:posts.length
          }
          res.status(200).json(response);
     }catch(error){
          if (error.name === 'CastError') {
               // Handle invalid user ID
               return res.status(400).json({ msg: 'Invalid user ID.' });
             }
             console.error('Error getting user posts:', error);
             res.status(500).json({ msg: 'Internal Server Error' });
     }
   }


   exports.savedPostToUser= async (req,res)=>{
     const user= await User.findOne({email:req.email});
     const postId= req.params.id;
     try{

          if(user.saved.includes(postId)){
               return res.status(404).json({msg:`Already exists in data with this id:${postId}`})
          }

         user.saved.push(postId);
         await user.save();

         res.status(200).send({
          msg:'Saved Post '
         });  

     }catch(error){
          if (error.kind === 'ObjectId') {
               return res.status(400).json({ msg: `Cast to ObjectId failed for value ${postId} at path \"_id\" for model \"user\""` });
           }
           console.error('Error liking post:', error);
           return res.status(500).json({ msg: 'Internal Server Error' })   
     }
   }

   exports.unSavedPostToUser= async(req,res)=>{
     const user= await User.findOne({email:req.email});
     const postId= req.params.id;
     try{

          if(!user.saved.includes(postId)){
               return res.status(404).json({msg:`No data found with this id: ${postId} `})
          }

         user.saved.pull(postId);
         await user.save();

         res.status(200).send({
          msg:'Unsaved Post '
         });

     }catch(error){
          if (error.kind === 'ObjectId') {
               return res.status(400).json({ msg: `Cast to ObjectId failed for value ${postId} at path \"_id\" for model \"user\""` });
           }
           console.error('Error liking post:', error);
           return res.status(500).json({ msg: 'Internal Server Error' })   
     }
   }

   exports.getAllSavedPost= async(req,res)=>{
     const user= await User.findOne({email:req.email})
     const savedPostIds = user.saved; //[a,b,c]

     try{
        // Retrieve the saved posts and populate user information
    const savePosts = await Post.find({ _id: { $in: savedPostIds } })
    //Post.find({ _id: { $in: postIds } }) will find all posts where the _id matches any value in the postIds array.

  // Return the saved posts
  const response = {
    savePosts,
    result: savePosts.length
  };
  res.status(200).json(response);
} catch (error) {
  console.error('Error getting saved posts:', error);
  res.status(500).json({ msg: 'Internal Server Error' });
}
   }