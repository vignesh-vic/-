require("dotenv").config();
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())

const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const messageRoutes = require('./routes/message.route')
var cors = require('cors')
app.use(cors(
    {
        origin: 'http://localhost:3000', // replace with your frontend domain
        credentials: true // this allows the browser to include cookies in the request
    }
))

app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

const connectDatabase = require('./db/Connection')


connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    });


app.use('/auth', authRoutes)
app.use('/messages', messageRoutes)
app.use('/users', userRoutes)