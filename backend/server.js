const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const Tesseract = require('tesseract.js')
const router = require('./src/routes/ocrRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/upload',router)

app.listen(3000,()=>{
    console.log( `server running on localhost://3000`);
})