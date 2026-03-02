import express from "express";
import migrateRouter from "./routes/migrate.js";

export const app = express();
app.use(express.json());

// Rutas de migración: /api/prueba/...
app.use('/api/prueba', migrateRouter);


