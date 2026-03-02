import express from "express";
import migrateRouter from "./routes/migrate.js";
import clientRouter from "./routes/clientRoute.js";
import supplierRouter from "./routes/supplierRoute.js";
import productRouter from "./routes/productRoute.js";

export const app = express();
app.use(express.json());

// Rutas de migración: /api/prueba/...
app.use('/api/prueba', migrateRouter);
app.use('/api/client', clientRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api', productRouter);