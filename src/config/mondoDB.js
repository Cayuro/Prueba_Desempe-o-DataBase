import mongoose from "mongoose";

// Importamos las variables de entorno (incluye la URL de MongoDB)
import { env } from "./env.js";

// ============================================================================
// FUNCIÓN DE CONEXIÓN
// ============================================================================

/**
 * connectMongoDB - Establece la conexión con MongoDB
 * 
 * Es una función asíncrona (async) porque conectarse a una base de datos
 * toma tiempo y no queremos bloquear el programa mientras esperamos.
 * 
 * EJEMPLO DE USO:
 * await connectMongoDB();  // Esperar a que se conecte antes de continuar
 */
export const connectMongoDB = async () => {
    try {
        // mongoose.connect() establece la conexión usando la URL del .env
        // La URL tiene este formato: mongodb://localhost:27018/nombreDB
        await mongoose.connect(env.mongoUri);
        
        console.log("✅ MongoDB conectado exitosamente");
        
    } catch (error) {
        // Si hay error (ej: MongoDB no está corriendo), lo mostramos
        console.log("❌ Error conectando a MongoDB:", error.message);
        
        // process.exit(1) termina la aplicación con código de error
        // Es mejor fallar rápido que continuar sin base de datos
        process.exit(1);
    }
};