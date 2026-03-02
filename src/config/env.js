import { config } from 'dotenv';

// Estas utilidades nos ayudan a encontrar la ruta correcta del archivo .env
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


const _dirname = dirname(fileURLToPath(import.meta.url));

config({ path: resolve(_dirname, '../../.env') });

const required = ["MONGO_URI", "POSTGRES_URI"];

for (const key of required) {
    if (!process.env[key]) {
        console.log(`❌ Error: Falta la variable de entorno requerida: ${key}`);
        console.log(`   Asegúrate de crear un archivo .env en la raíz del proyecto`);
        // Podrías descomentar esto para detener la app si falta una variable:
        // throw new Error(`Missing required environment variable: ${key}`);
    }
}


export const env = {
    // Puerto donde correrá el servidor (por defecto 3000)
    port: process.env.PORT ?? 3000,
    
    // URL de conexión a PostgreSQL
    // Formato: postgresql://usuario:contraseña@host:puerto/nombreDB
    postgresUri: process.env.POSTGRES_URI,
    
    // URL de conexión a MongoDB
    // Formato: mongodb://host:puerto/nombreDB
    mongoUri: process.env.MONGO_URI,
    
    // Ruta al archivo CSV con los datos a migrar
    fileDataCsv: process.env.FILE_DATA_CSV ?? "./data/x.csv"
};
