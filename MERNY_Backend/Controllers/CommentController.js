const Comment= require('../Models/CommentModel');
const User= require('../Models/UserModel');
const Post= require('../Models/PostModel');

exports.addComment=async (req,res)=>{
     const { content, likes, postId, reply,tag } = req.body;
     const user= await User.findOne({email:req.email})

     try {
       // Check if the post exists (assuming you have a Post model)
       const post = await Post.findOne({ _id: postId });
       if (!post) {
         return res.status(404).json({ msg: 'This post does not exist.' });
       }
       //console.log(post.user);
   
       const newComment = new Comment({
         content,
         likes,
         postId,
         postUserId:post.user,
         reply,
         tag,
         createdBy:user._id
       });
   
       await newComment.save();
   
       res.json({ msg: 'Comment added successfully.', comment: newComment });
     } catch (error) {
       console.error('Error adding comment:', error);
       res.status(500).json({ msg: 'Internal Server Error' });
     }
}

exports.updateComment= async (req,res)=>{
     const commentId = req.params.id;
     const { content } = req.body;
     const user= await User.findOne({email:req.email});

  try {
    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found.' });
    }

    // Update the content of the comment
    if((user._id).equals(comment.createdBy)){
     comment.content = content;
    await comment.save();
    }else{
     return res.status(400).json({msg:`Permission denied: You can't edit others comment`})
    }

    res.json({ msg: 'Update Success!' });
    
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: `Cast to ObjectId failed for value ${commentId} at path \"_id\" for model \"comment\"` });
    }
    console.error('Error updating comment:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}


exports.replytoAComment= async(req,res)=>{
  const commentId= req.params.id;
  const user= await User.findOne({email:req.email});
   

  try{
    const comment= await Comment.findById(commentId);
    const postUserId= comment.postUserId;

    if(!comment){
      return res.status(404).json({msg:'No comment found'})
    }
    // Check if the user has already liked the comment
    const isReplied= comment.reply.some(reply=>reply.equals(user._id));
    if(isReplied){
      return res.status(400).json({ msg: 'You have already replied this comment.' });
    }
    // Add the user's ID to the likes array
    comment.reply.push(user._id);
    await comment.save();
    return res.status(200).json({ msg: 'Replied Comment!' });
        
     }catch(error){
          if (error.name === 'CastError') {
               return res.status(400).json({ msg: `Cast to ObjectId failed for value ${commentId} at path \"_id\" for model \"comment\"` });
             }
             console.error('Error updating comment:', error);
             res.status(500).json({ msg: 'Internal Server Error' });
     }
}


exports.likeAComment= async(req,res)=>{
  
  const commentId= req.params.id;
  const user= await User.findOne({email:req.email});

  try{
    const comment= await Comment.findById(commentId);

    if(!comment){
      return res.status(404).json({msg:'No comment found'})
    }
    // Check if the user has already liked the comment
    const isLiked= comment.likes.some(like=>like.equals(user._id));
    if(isLiked){
      return res.status(400).json({ msg: 'You have already liked this comment.' });
    }
    // Add the user's ID to the likes array
    comment.likes.push(user._id);
    await comment.save();
    return res.status(200).json({ msg: 'Liked Comment!' });

  }catch(error){
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: `Cast to ObjectId failed for value ${commentId} at path \"_id\" for model \"comment\"` });
    }
    console.error('Error liking comment:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}



exports.unLikeAComment= async(req,res)=>{
  
  const commentId= req.params.id;
  const user= await User.findOne({email:req.email});

  try{
    const comment= await Comment.findById(commentId);

    if(!comment){
      return res.status(404).json({msg:'No comment found'})
    }
    // Check if the user has already liked the comment
    const isLiked= comment.likes.some(like=>like.equals(user._id));
    if(!isLiked){
      return res.status(400).json({ msg: 'You have not liked the comment yet.' });
    }
    // Remove the user's ID to the likes array
    comment.likes.pull(user._id);
    await comment.save();
    return res.status(200).json({ msg: 'Unliked Comment!' });

  }catch(error){
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: `Cast to ObjectId failed for value ${commentId} at path \"_id\" for model \"comment\"` });
    }
    console.error('Error liking comment:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
}


exports.deleteComment= async (req,res)=>{
  const user= await User.findOne({email:req.email})
  const commentId= req.params.id;

  try{
    const comment= await Comment.findById(commentId);
    if(!comment){
      return res.status(404).send('Comment already deleted');
    }
    
    if (comment.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({ msg: 'Permission denied: You can only delete your own comments.' });
    }

    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json({ msg: 'Deleted Comment!' });

  }catch(error){
    if (error.name === 'CastError') {
      return res.status(400).json({ msg: `Cast to ObjectId failed for value ${commentId} at path \"_id\" for model \"comment\"` });
    }
    console.error('Error liking comment:', error);
    return res.status(500).json({ msg: 'Internal Server Error' });

  }
}

