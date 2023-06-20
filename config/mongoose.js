const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ayushsaxena38:Ayush%4012345@cluster0.dwrztdb.mongodb.net/',{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

//if error occured then this db.on() will notify by showing this message.
db.on('error',console.error.bind(console,'error connecting to db'));

//when the connection is successfully established the db.onse() will notify by showing this message.
db.once('open',function(){
    console.log('successfully connected to the data base')
});