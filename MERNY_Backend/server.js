const express= require('express');
const app= express();
const portConfig= require('./Configs/serverConfigs');
const dbConfig= require('./Configs/dbConfigs');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:'10mb'}));

//Allowing CORS: cross-origin-resource-sharing;

// app.use(cors())
app.use((req,res,next)=>{
     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.header('Access-Control-Allow-Credentials','true')
     res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS,PATCH')
     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization,Token')
     next();
});



mongoose.connect(dbConfig.DB_URL);
const db= mongoose.connection;

db.once('open',()=>{
     console.log("Successfully connected to mongoDb")
})
db.on('error',()=>{
     console.log("Error while connecting to dataBase")
     process.exit();
})

require('./Routes/AuthRoute')(app);
require('./Routes/UsersRoute')(app);
require('./Routes/commentRoute')(app);
require('./Routes/postRoutes')(app);
require('./Routes/notificationRoute')(app);



app.listen(portConfig.PORT,()=>{
     console.log(`Server is up and running on Port: ${portConfig.PORT}`)
})
