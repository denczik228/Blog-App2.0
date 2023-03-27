const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));


// app.get('/', (req, res) => {
//     res.json({ msg: `test` })
// });
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);


async function start() {
    try {
        await mongoose
          .set("strictQuery", false)
          .connect(process.env.MONGO_URL)
            .then(
               app.listen(process.env.PORT, () => {
                  console.log(`server and DB were started, PORT of server: ${process.env.PORT}`);
        }))  
    } catch (error) {
        console.log(error)
    }
}

start();

