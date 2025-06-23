import express,{Request,Response} from 'express';
import productRoutes from './routes/products';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req: Request, res:Response)=>{
    res.status(200).json({
        message: 'Welcome to the API!',
        success: true
    })
})

app.use('/api/v1/products', productRoutes)

const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})