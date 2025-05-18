import express from 'express';
import mocksRouter from './routes/mocks.routes.js';
import adoptionsRouter from './routes/adoptions.routes.js';
import mongoose from 'mongoose';
import swaggerDocs from './utils/swagger.js';

const app = express()
const PORT = 8080
app.use(express.json())


const URI = "mongodb+srv://emitraverso:coder@cluster0.pnkqvqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(URI)
.then(() => console.log("DB conectada"))
.catch((e) => console.log("Error al conectar a DB:", e))

//swagger
swaggerDocs(app)

//Rutas
app.use('/api/mocks', mocksRouter)
app.use('/api/adoptions',adoptionsRouter);
app.get('/', (req,res) => {
    res.status(200).send("Bienvenido!")
})
app.use('/apidocs', swaggerDocs)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})

export default app;