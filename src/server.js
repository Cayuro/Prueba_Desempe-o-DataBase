import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectMongoDB } from "./config/mondoDB.js";
import { createTables } from "./config/postgres.js";


try {
    // PASO 1: Conectar a MongoDB
    console.log('Conectando a MongoDB...');
    await connectMongoDB();
    
    // PASO 2: Conectar a PostgreSQL y crear tablas
    console.log('Conectando a PostgreSQL...');
    // createTables() verifica si las tablas existen y las crea si no
    await createTables();
    
    // PASO 3: Iniciar el servidor HTTP
    // app.listen() hace que Express "escuche" peticiones en el puerto especificado
    // Cuando alguien hace una petición a http://localhost:3000/..., Express la recibe
    app.listen(env.port, () => {
        console.log(`Servidor corriendo en http://localhost:${env.port}`);
        console.log(`Endpoints disponibles:`);
        console.log(`   POST /api/prueba/migrate  - Migrar datos del CSV a las bases de datos`);
        // Aquí podrías listar otros endpoints disponibles
    });

} catch (error) {
    console.log('Error al iniciar el servidor:', error);
    process.exit(1);
}