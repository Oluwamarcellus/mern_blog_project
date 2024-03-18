import express from "express";


const port = process.env.PORT || 3000;
const app = express();

app.listen(port || 3000, () => { 
    console.log("Server running on port ", port);
})