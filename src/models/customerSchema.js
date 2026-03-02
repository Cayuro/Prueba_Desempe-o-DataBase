import mongoose from "mongoose";


const productsSchema = mongoose.Schema(
    {
        "productSku": String,
        "productName": String,
        "quantity": Number,
        "unitPrice": Number,
        "totalValue": Number
    }, 
    { _id: false }  // No generar _id para los cursos individuales
);

const orderHistorySchema = mongoose.Schema(
    {
        "orderId": String,
        "date": Date,
        "products": [productsSchema]  // Array de productos usando el sub-esquema
    }, 
    { _id: false }
); 


const CustomerSchema = mongoose.Schema(
    {
        "customerEmail": String,
        "customerName": String,
        "orderHistory": [orderHistorySchema]
    }, 
    { _id: false }
);

export const customerSchema = mongoose.model(
    "UserOrders",  // Nombre de la colección en MongoDB (se pluraliza automáticamente)
    CustomerSchema  // Esquema que define la estructura de los documentos
);