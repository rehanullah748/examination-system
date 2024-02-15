const express = require("express")
const connect = require("./config/dataBase")
const cookieParser = require('cookie-parser')
var cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/auth.route')
const studentRoutes = require('./routes/student.route')
const marksRoute = require('./routes/marks.route')
const app = express()
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json())
connect();
app.use('/api', authRoutes)
app.use('/api', studentRoutes)
app.use('/api', marksRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`)
})