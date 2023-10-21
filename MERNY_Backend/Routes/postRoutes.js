const PostController= require('../Controllers/postController');
const authMW= require('../Middlewares/authMW')

module.exports= function(app){
     app.post('/posts',[authMW.verifyToken],PostController.createPost);
     app.get('/posts',[authMW.verifyToken],PostController.getPosts);
     app.patch('/post/:id',[authMW.verifyToken],PostController.updatePostById);
     app.get('/post/:id',[authMW.verifyToken],PostController.getPostById);
     app.delete('/post/:id',[authMW.verifyToken],PostController.deletePost);
     app.patch('/post/:id/like',[authMW.verifyToken],PostController.likePostById);
     app.patch('/post/:id/unlike',[authMW.verifyToken],PostController.UnlikePostById);
     app.get('/user_post/:id',[authMW.verifyToken],PostController.userPostsByUserId);
     app.patch('/savePost/:id',[authMW.verifyToken],PostController.savedPostToUser);
     app.patch('/unSavePost/:id',[authMW.verifyToken],PostController.unSavedPostToUser);
     app.get('/getSavePosts',[authMW.verifyToken],PostController.getAllSavedPost);

}