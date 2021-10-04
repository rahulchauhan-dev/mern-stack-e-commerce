import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import womensRoutes from './routes/womensRoutes.js'
import mensRoutes from './routes/mensRoutes.js'
import mensProduct from './routes/mensProduct.js'
import womensProduct from './routes/womensProduct.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import contactRoutes from './routes/contactRoutes.js'





dotenv.config()

connectDB()

const app = express()

app.use(express.json())





app.use('/api/mensproducts', mensProduct)
app.use('/api/womensproducts', womensProduct)
app.use('/api/menswear', mensRoutes)
app.use('/api/womenswear', womensRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/contact', contactRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is Runnig...')
    })
}





app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))