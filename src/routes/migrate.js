import { Router } from "express";
import { migrateData } from "../config/postgres.js";

const router = Router();
/*
 * EJEMPLO DE USO CON POSTMAN:
 * Método: POST
 * URL: http://localhost:3000/api/prueba/migrate
 */
router.post('/migrate', async (req, res) => {
    try {
        // Ejecutamos la migración y obtenemos contadores
        const counters = await migrateData();
        
        // Enviamos respuesta exitosa (código 200 = OK)
        // res.json() convierte el objeto a JSON y lo envía al cliente
        res.status(200).json({
            message: 'Migración completada exitosamente',
            counters  // Incluimos las estadísticas de la migración
        });
        
    } catch (error) {
        // Si algo falla, enviamos error (código 500 = Error interno del servidor)
        res.status(500).json({
            message: 'Error durante la migración',
            error: error.message
        });
    }
});

// ============================================================================
// EXPORTACIÓN
// ============================================================================

/**
 * Exportamos el router para usarlo en app.js
 * Allá se monta con: app.use('/api/prueba', migrateRouter)
 */
export default router;