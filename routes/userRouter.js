const express = require('express');
const userRouter = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

userRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user1 = await userModel.findOne({ email });

    if (user1) {
        return res.status(500).json({
            message: "user already registered"
        });
    } else {


        try {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(500).json({
                        message: 'Error while hasing the password'
                    });
                }
                const user = new userModel({ username, email, password: hash });
                await user.save();
                res.status(201).json({
                    message: "User registered successfully"
                });
            });
        } catch (error) {
            res.status(500).json({
                message: "Error while registering the user", error
            });
        }
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id, user: user.username }, 'masai');
                    res.status(200).json({
                        message: "user logged in successfully", token
                    });
                } else {
                    res.status(401).json({
                        message: "Wrong Password!"
                    });
                }
            });
        } else {
            res.status(404).json({
                message: "User not found, please register first"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error while logging in the user", error
        });
    }

});

module.exports = userRouter;

