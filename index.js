const express = require('express');
const env = require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const logger = require('./config/logger');
const itemsRouter = require('./routes/items');
//urlencoded middleware
app.use(express.urlencoded());
//routes part 
app.use('/',itemsRouter);


//app.listen()
app.listen(PORT,(err)=>{
    if(err){
        console.log('Error in Setting Up the Server : ',err);
        logger.error('Error in Setting Up the Server : ',err);
    }
    console.log('Server is Setted UP and Running on Port :',PORT);
    logger.info('Server is Setted UP and Running on Port :',PORT);
});