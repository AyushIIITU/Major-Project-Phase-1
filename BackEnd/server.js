const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const db=require('./db');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const PORT=process.env.PORT||3000;
app.get("/",(req,res)=>{
    res.send("Server is ok");
})
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})
