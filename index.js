import express from 'express'
import dotenv from 'dotenv'
import Connect from './db/connection.js'
import userRouter from './routes/user.route.js'
import bookRouter from './routes/book.route.js'
import favRouter from "./routes/fav.routes.js"
import cartRouter from "./routes/cart.route.js"
import orderRouter from "./routes/order.route.js"
import cors from "cors"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello Dev!')
})

app.use('/auth', userRouter)
app.use('/book', bookRouter)
app.use('/fav', favRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

const startServer = async () => {
    try {
        await Connect()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()