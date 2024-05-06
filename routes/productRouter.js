const express = require('express');
const productModel = require('../models/productModel');
const authMiddleWare = require('../middleware/authmiddlware');

const productRouter = express();

// CRUD OPERATIONS

productRouter.post("/create", authMiddleWare, async (req, res) => {
    const { title, poster, userID, username, price } = req.body;
    try {
        const note = new productModel({ title, poster, userID, username, price });
        await note.save();
        res.status(201).json({
            message: "Note created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while craeating the note", error
        });
    }
});

productRouter.get("/", authMiddleWare, async (req, res) => {
    console.log(req.body);
    const { userID, user } = req.body;
    try {
        const notes = await productModel.find({ userID });
        res.status(200).json({
            message: "All notes",
            notes
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while getting all notes",
            error
        });
    }
});


productRouter.delete("/update/:id", authMiddleWare, async (req, res) => {
    const { id } = req.params;
    try {

        await productModel.findByIdAndDelete({ _id: id });
        res.status(200).json({
            message: `Note deleted successfully with id : ${id} `
        });

    } catch (error) {
        res.status(500).json({
            message: `Error while deleting the note`,
            error
        });
    }
});

module.exports = productRouter;