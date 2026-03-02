import express from "express";
import migrateRouter from "./routes/migrate.js";

// ============================================================================
// CREACIÓN DE LA APLICACIÓN EXPRESS
// ============================================================================

/**
 * express() crea una instancia de la aplicación.
 * 'export' hace que podamos importar 'app' desde otros archivos (como server.js)
 */
export const app = express();

// ============================================================================
// MIDDLEWARES - Funciones que procesan TODAS las peticiones
// ============================================================================

/**
 * express.json() es un middleware que:
 * - Lee el cuerpo (body) de las peticiones que llegan en formato JSON
 * - Lo convierte en un objeto JavaScript accesible en req.body
 * 
 * Sin esto, si envías {"name": "Juan"} en una petición POST,
 * no podrías acceder a req.body.name
 */
app.use(express.json());

// ============================================================================
// REGISTRO DE RUTAS - Conectamos cada "departamento" de la API
// ============================================================================

/**
 * app.use(ruta_base, router) conecta un router a una ruta base.
 * 
 * EJEMPLO: Si migrateRouter tiene una ruta POST '/migrate',
 * la URL completa será: POST /api/prueba/migrate
 * 
 * Es como decir: "Todo lo que empiece con /api/prueba, 
 * envíalo al migrateRouter para que lo maneje"
 */

// Rutas de migración: /api/prueba/...
app.use('/api/prueba', migrateRouter);



// // Rutas de cursos: /api/courses/...
// app.use('/api/courses', coursesRouter);

// // Rutas de reportes: /api/reports/...
// app.use('/api/reports', reportsRouter);

// // Rutas de estudiantes: /api/students/...
// // Incluye el endpoint del Kardex: GET /api/students/:email/transcript
// app.use('/api/students', studentsRouter);
