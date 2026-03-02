import { env } from "./env.js";
import pg from 'pg';
import { queryData, queryTables } from "../services/migrateService.js";

const { Pool } = pg;

export const pool = new Pool({
    connectionString: env.postgresUri
});

async function createTables() {
    try {
        // queryTables() está definida en migrateService.js
        // Contiene los CREATE TABLE para todas las tablas
        await queryTables();
        console.log("Tablas de PostgreSQL verificadas/creadas");
    } catch (error) {
        console.error("Error creando tablas:", error);
    }
}

/**
 * migrateData - Migra datos del CSV a las bases de datos
 * Es idempotente: puedes ejecutarla múltiples veces sin duplicar datos.
 */
async function migrateData() {
    try {
        // queryData() está definida en migrateService.js
        // Retorna contadores de cuántos registros se insertaron
        return await queryData();
    } catch (error) {
        console.error("Error migrando datos:", error);
    }
}

// Exportamos las funciones para usarlas en otros archivos
export { createTables, migrateData };
