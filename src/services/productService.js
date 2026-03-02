import { pool } from "../config/postgres.js";


// Genera un listado de los productos más vendidos dentro de una categoría
// específica, ordenados por ingresos generados

async function getTopProductsByCategory(category) {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const result = await client.query(`
            select p.name as product_name, sum(t.quantity) as total_quantity, sum(t.total_value) as total_revenue
            from product p
            join "transaction" t on p.id = t.product_id
            where p.category_id = $1
            group by p.name
            order by total_revenue desc
            limit 10;
        `, [category]);
        
        await client.query('COMMIT');
        
        return result.rows;
        
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }   finally {   
        client.release();
    }
}

// Exportamos las funciones para usarlas en las rutas
export { getTopProductsByCategory };