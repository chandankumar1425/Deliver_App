const express = require('express');
const { UserModel } = require("../model/user.model");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//This route is user for register only
UserRouter.post("/register", async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
        return res.status(400).json({ "Ok": false, "msg": "User already present please login" });
    }
    bcrypt.hash(password, 3, async (err, hashed) => {
        try {
            const data = new UserModel({ name, email, password: hashed, address });
            await data.save();
            return res.status(201).json({ "Ok": true, "msg": "User Regitered sucessfully" });

        } catch (error) {
            return res.status(400).json({ "Ok": false, "msg": err.message });

        }
    })

})
//This route is used for login only
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ "Ok": false, "msg": "User not found" });
        }
        const data = await bcrypt.compare(password, user.password);
        if (!data) {
            return res.status(400).json({ "Ok": false, "msg": "Invalid Credential" });
        }
        const token = jwt.sign({ userId: user._id }, "delivery", { expiresIn: "3hr" })
        const response = {
            "Ok": true,
            "Token": token,
            "msg": "Login Successful"
        }
        res.status(201).json(response)
    }
    catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });
        // console.log(error)

    }

})
//To reset the password 
UserRouter.patch("/user/:id/reset", async (req, res) => {
    const { password, new_password } = req.body;
    const id = req.params.id;
    try {
        const user = await UserModel.findById({ _id: id });
        if (!user) {
            return res.status(404).json({ "Ok": false, "msg": "Register First" });
        }
        const data = await bcrypt.compare(password, user.password);
        if (!data) {
            return res.status(400).json({ "Ok": false, "msg": "Enter Correct Password to reset password" });
        }
        bcrypt.hash(new_password, 3, async (err, hashed) => {
            try {
                const data = await UserModel.findByIdAndUpdate({ _id: id, password: new_password });
                await data.save()
                return res.status(201).json({ "Ok": true, "msg": "Password Changed" });

            } catch (error) {
                return res.status(400).json({ "Ok": false, "msg": err.message });
            }

        })
    }
    catch (error) {
        return res.status(400).json({ "Ok": false, "msg": err.message });
        // console.log(error)

    }
})
module.exports = { UserRouter }