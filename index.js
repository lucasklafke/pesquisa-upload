import express, {json}from "express"
import multer from "multer"
import dotenv from "dotenv"
import cors from "cors"
const app = express()

dotenv.config()

app.use(cors())
app.use(json())

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
app.post("/", upload.single('file'), async (req,res) =>{
        console.log("body",req.body)
        console.log("file",req.file)
        res.send("ok")
})

app.get("/", async(req,res) => {

        let db;
        const mongoClient = new MongoClient(process.env.MONGO_URL);
        try {
                await mongoClient.connect();
                db = mongoClient.db("uploadtestes");
                console.log("Connected to uploadtestes mongoDB database");

                const testes = db.collection("testes")

                const imagesTestes = await testes.findMany({})

        } catch (e) {
                console.log("Failed to connect to uploadtestes mongoDB database", e);
        }
})

app.listen(5000)