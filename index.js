import express from "express"
import multer from "multer"
const app = express()

const storage = multer.diskStorage({
        destination: (req,file,cb) =>{
                cb(null,'uploads/')
        },
        filename: (req,file,cb) =>{
                cb(null, file.originalname)
        }
})
// const upload = multer({dest:"uploads/"})
const upload = multer({storage})

app.set('view engine', 'ejs');
app.set('views', './views');
app.post("/", upload.single('img'), (req,res) =>{
        console.log("body",req.body)
        console.log("file",req.file)
        res.send("ok")
})

app.get("/",(req,res) => res.render("home"))

app.listen(5000)