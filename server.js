require("dotenv").config();
const app = require("./src/app");


const db = require("./src/config/database");
db.connectDB();





app.listen(3000, ()=>{
    console.log(`server is running on the port 3000`);
})