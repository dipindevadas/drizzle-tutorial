import express,{Request,Response} from 'express';
import productRoutes from './routes/products';
import usersRoutes  from './routes/users'
import orderRoutes from './routes/orders'
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.get('/',(req: Request, res:Response)=>{
    res.status(200).json({
        message: 'Welcome to the API!',
        success: true
    })
})

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/auth', usersRoutes)
app.use('/api/v1/orders', orderRoutes)

const port = process.env.port || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})