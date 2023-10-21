const commentController= require('../Controllers/CommentController');
const authMW= require('../Middlewares/authMW');

module.exports= function(app){
     app.post('/comment',[authMW.verifyToken],commentController.addComment);
     app.post('/comment/:id',[authMW.verifyToken],commentController.updateComment)
     app.post('/replyOnComment/:id',[authMW.verifyToken],commentController.replytoAComment);
     app.post('/comment/:id/like',[authMW.verifyToken],commentController.likeAComment);
     app.post('/comment/:id/unLike',[authMW.verifyToken],commentController.unLikeAComment);
     app.delete('/comment/:id',[authMW.verifyToken],commentController.deleteComment);

}