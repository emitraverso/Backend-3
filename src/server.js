import express from 'express';
import mocksRouter from './routes/mocks.routes.js';
import mongoose from 'mongoose';

const app = express()
const PORT = 8080
app.use(express.json())


const URI = "mongodb+srv://emitraverso:coder@cluster0.pnkqvqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(URI)
.then(() => console.log("DB conectada"))
.catch((e) => console.log("Error al conectar a DB:", e))

//Rutas
app.use('/api/mocks', mocksRouter)
app.get('/', (req,res) => {
    res.status(200).send("Bienvenido!")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
})