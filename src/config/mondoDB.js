import mongoose from "mongoose";
import { env } from "./env.js";


export const connectMongoDB = async () => {
    try {
        // mongoose.connect() establece la conexión usando la URL del .env
        // La URL tiene este formato: mongodb://localhost:27018/nombreDB
        await mongoose.connect(env.mongoUri);
        
        console.log("MongoDB conectado exitosamente");
        
    } catch (error) {
        // Si hay error (ej: MongoDB no está corriendo), lo mostramos
        console.log("Error conectando a MongoDB:", error.message);
        
        // process.exit(1) termina la aplicación con código de error
        // Es mejor fallar rápido que continuar sin base de datos
        process.exit(1);
    }
};