const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/db');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
    res.status(200).send('welcome to home page');
});

app.listen(8080, async () => {
    try {
        await dbConnect();
        console.log(`DB Connected Successfully`)
    } catch (error) {
        console.log(error);
    }
    console.log(`Server was running on port 8080`)
});
