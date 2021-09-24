const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',routesHandler);

//DB Connection
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true , useUnifiedTopology:true})
.then(()=>{
    console.log('DB Connected!');
})
.catch((err)=>{
    console.log(err);

});

const port = process.env.PORT || 4000; //backend routing port


app.listen(port, ()=>{
    console.log(`Server is running at port ${port}.`);
});