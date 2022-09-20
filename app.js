const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");
// var cors = require("cors");
// app.use(cors());
// storage engine 
var qwer;
global.myNumber;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
})

app.use('/image', express.static('upload/images'));
app.post("/upload",upload.single('profile'),  (req, res) => {
    //console.log("0000000000000000000000");
    
    //console.log(req);
    

    res.json({
        success: 1,
        profile_url: `http://localhost:4000/image/${req.file.filename}`,
        imageName:req.file.filename
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

app.use(errHandler);
app.listen(4000, () => {
    console.log("server up and running on port 4000");
})
