import { pool } from "../config/postgres.js";

async function getCustomerPurchaseHistory(customerId) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        // aquí debemos obtener historial de compras de un cliente especifico detallando productos, fechas, total gastado en cada order
        const result = await client.query(`
            select  c."name", o.id as order_id, o.date, t.total_value , p.name as product_name, t.quantity, t.total_value
            from "order" o
            join "transaction" t on o.id = t.order_id
            join customer c on c.id = t.customer_id 
            join product p on t.product_id = p.id
            where t.customer_id = $1
            order by o.date desc;
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