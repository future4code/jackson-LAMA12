import express, { Express } from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'
import { userRouter } from './routes/UserRoutes'

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

//verifica se a porta 3003 já não está sendo usada
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
})
