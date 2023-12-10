const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 8080;
const connections = require("./config/db");

const userRouter = require("./Routes/user.routes");


app.use("/api/user", userRouter);


const path = require('path');
__dirname=path.resolve();
// render deployment

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}

app.listen(port, () => console.log(`listening on port number ${port}`));
