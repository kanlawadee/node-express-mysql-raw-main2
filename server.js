const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); //เรียกใช้งาน json

app.use(express.urlencoded({extended: true}));  //รับค่าจากฟอร์ม

//เข้าเบาร์เซอร์ ใส่ URL http://localhost:8080 
app.get("/", (req, res)=>{
    res.json({message: "Welcome to itd102 application"});
});

// http://localhost:8080/api/tutorials
require("./app/routes/tutorial.routes.js")(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});