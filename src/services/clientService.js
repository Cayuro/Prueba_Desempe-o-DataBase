import { pool } from "../config/postgres.js";

// historial de compras de un cliente especifico detallando productos, fechas, total gastado en cada order

async function getCustomerPurchaseHistory(customerId) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const result = await client.query(`
            select distinct o.id, o."date" , p.name,c."name" from customer c 
join "transaction" t on c.id = t.customer_id
join "order" o on o.id = t.order_id
join product p on t.product_id = p.id
        `, [customerId]);
        
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