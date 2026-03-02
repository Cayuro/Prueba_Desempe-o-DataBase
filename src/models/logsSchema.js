import mongoose from "mongoose";


const logSchema = mongoose.Schema(
    {
        "table": String,
        "date": Date,
        "query": String
    }, 
    { _id: false }  // No generar _id para los cursos individuales
);


export const logSchemaModel = mongoose.model(
    "Logs",  // Nombre de la colección en MongoDB (se pluraliza automáticamente)
    logSchema  // Esquema que define la estructura de los documentos
);

// no funciona el modelo de logsSchema