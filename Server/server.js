import app from "./app.js";
import ConnectDB from "./config/db.js";



ConnectDB()
const POERT = 3000;

app.listen(POERT, ()=>{
    console.log(`Server is running on port ${POERT}`);
})