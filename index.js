const express = require('express')
const app= express();
const connection = require("./db")
const {UserRouter}=require("./router/user.router")
const {OrderRouter}=require("./router/order.router")
const {ResturantRouter}=require("./router/resturant.router")
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Welcome To the Food Delivery App")
})
app.use("/api",UserRouter)
app.use("/api",OrderRouter)
app.use("/api",ResturantRouter)
app.listen(7878,async(req,res)=>{
    try {
        await connection
        console.log("Db connection established")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Server is running at port no 7878")
})