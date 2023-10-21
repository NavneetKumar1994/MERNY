const userController= require('../Controllers/UserController');
const userMW= require('../Middlewares/authMW');

module.exports= function(app){
     app.get('/merny/api/v1/search',[userMW.verifyToken],userController.findAll);
     app.get('/merny/api/v1/:id',[userMW.verifyToken],userController.findById);
     app.put('/merny/api/v1/:email',[userMW.verifyToken,userMW.checkForUser],userController.updateUser);
     app.patch('/merny/api/v1/:id/follow',[userMW.verifyToken],userController.followbyId);
     app.patch('/merny/api/v1/:id/unfollow',[userMW.verifyToken],userController.unFollowById);
     app.get('/suggestionsUser',[userMW.verifyToken],userController.userSuggestions);
}

