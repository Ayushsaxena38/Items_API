const express = require('express');
const app = express();
const PORT = 8000;
const itemsRouter = require('./routes/items');
//urlencoded middleware
app.use(express.urlencoded());
//routes part 
app.use('/',itemsRouter);


//app.listen()
app.listen(PORT,(err)=>{
    if(err) console.log('Error in Setting Up the Server : ',err);
    console.log('Server is Setted UP and Running on Port :',PORT);
});