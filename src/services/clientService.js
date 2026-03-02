import { pool } from "../config/postgres.js";

async function getCustomerPurchaseHistory(customerId) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        // aquí debemos obtener historial de compras de un cliente especifico detallando productos, fechas, total gastado en cada order
        const result = await client.query(`
           select distinct o.id, o."date" , p.name,c."name", t.total_value from customer c 
join "transaction" t on c.id = t.customer_id
join "order" o on o.id = t.order_id
join product p on t.product_id = p.id
        `, [customerId]);
        // hasta ahora obtenemos el historial, con el client id aseguramos que se agrupe por cliente y ahí es donde se puede agrupar por orden, fecha, total gastado, etc.
        await client.query('COMMIT');
        
        return result.rows;
        
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// exportamos funcion 

export {getCustomerPurchaseHistory}