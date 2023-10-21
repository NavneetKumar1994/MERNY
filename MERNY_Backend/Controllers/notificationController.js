const Notification= require('../Models/NotificationModel');
const User= require('../Models/UserModel');



exports.createNotification= async (req,res)=>{

     const user= await User.findOne({email:req.email})

     try{
          const {recipients,url,text}= req.body;

          const notification= new Notification({
               //id,
               recipients,
               url,
               text,
               isRead:false,
               user:user._id
          })
          await notification.save();

          res.status(200).send({
               notification:notification
          })

     }catch(error){
          console.error('Error creating notification:', error);
          res.status(500).json({ msg: 'Internal Server Error' });
     }

}

exports.getNotifications= async (req,res)=>{
     const user= await User.findOne({email:req.email});

     try{
         const notifications= await Notification.find({user:user._id}).populate('user','avatar _id username');

         res.status(200).send({
          Notifications: notifications.length,
          notifications:notifications
         })
     }catch(error){
          console.error('Error creating notification:', error);
          res.status(500).json({ msg: 'Internal Server Error' });
     }
}

exports.readNotifStatus= async (req,res)=>{
     try {
          const notificationId = req.params.id;
      
          const updatedNotification= await Notification.findByIdAndUpdate(
               notificationId,
               {isRead:true},
               {new:true} // Return the updated notification
               )
      
          res.json({
            notifications: updatedNotification
          });
        } catch (error) {
          console.error('Error updating notification status:', error);
          res.status(500).json({ msg: 'Internal Server Error' });
        }
}


exports.deleteNotifications= async (req,res)=>{
     try {
          // Delete all notifications
          const deleteResult = await Notification.deleteMany();
      
          res.json({
            notifications: deleteResult
          });
        } catch (error) {
          console.error('Error deleting notifications:', error);
          res.status(500).json({ msg: 'Internal Server Error' });
        }
}



