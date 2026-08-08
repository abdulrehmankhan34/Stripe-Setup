import app from "./app.js";

const POERT = 3000;

app.listen(POERT, ()=>{
    console.log(`Server is running on port ${POERT}`);
})