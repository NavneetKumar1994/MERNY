const notificationController= require('../Controllers/notificationController');
const authMW= require('../Middlewares/authMW');

module.exports= function(app){
     app.post('/notification',[authMW.verifyToken],notificationController.createNotification);
     app.get('/notifications',[authMW.verifyToken],notificationController.getNotifications)
     app.patch('/isReadNotification/:id',[authMW.verifyToken],notificationController.readNotifStatus)
     app.delete('/deleteAllNotification',[authMW.verifyToken],notificationController.deleteNotifications);
}