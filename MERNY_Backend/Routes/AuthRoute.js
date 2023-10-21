const authController= require('../Controllers/AuthController');

module.exports= function(app){
     app.post('/merny/auth/register',authController.signup);
     app.post('/merny/auth/login',authController.login);
     app.post('/merny/auth/logout',authController.logout);

}