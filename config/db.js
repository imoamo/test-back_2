
const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb+srv://imoamo:imo786yo@cluster0.rl2miul.mongodb.net/boAt?retryWrites=true&w=majority')
};

module.exports = dbConnect;