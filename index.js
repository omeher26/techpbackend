const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/allRoutes');

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 7040;
const MONGO_ATSL_URL = process.env.MONGO_ATSL_URL;

app.get('/',(req,res)=>{
    res.send('hello india')
})

mongoose.connect(MONGO_ATSL_URL)
.then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT , ()=>{
        console.log(`server is connected at port ${PORT}`)
    })
})

app.use(router);

