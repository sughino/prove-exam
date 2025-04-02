import express from "express";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import allowCrossDomain from "./utils/allowCrossDomain.js";
import generalRoutes from "./routes/generalRoutes.js";
import insertRoutes from "./routes/insertRoutes.js";
import modifylRoutes from "./routes/modifyRoutes.js";
import deleteRoutes from "./routes/deleteRoutes.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);
app.use(allowCrossDomain);
app.use(cors({
    origin: ['https://prove-exam.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use("/api/general", generalRoutes);
app.use("/api/insert", insertRoutes);
app.use("/api/modify", modifylRoutes);
app.use("/api/delete", deleteRoutes);
app.all('*', (req, res) => {return res.status(404).json({
    status: 'failure',
    data: {},
    message: 'not found',
    code: 404
})})

app.listen(PORT, () => {console.log(`server running on port ${PORT}`);});

/*app.get('/persone/:id', (req, res) => {
    const personaFiltrata = persone.find((persona) => persona.id === Number(req.params['id']));
    if(!personaFiltrata) {
        return res.status(404).json({message: 'not found', success: false, code: 404, data: []})
    }
    res.json(personaFiltrata)
})*/