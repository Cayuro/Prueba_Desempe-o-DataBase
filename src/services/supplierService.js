import { pool } from "../config/postgres.js";
// proveedores que mas venden y cual es el total de inventario de cada producto

async function getTopSuppliers() {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const result = await client.query(`
            select s.name as supplier_name, sum(t.quantity) as total_quantity
            from supplier s
            join "transaction" t on s.id = t.supplier_id
            group by s.name
            order by total_quantity desc
            limit 5;
        `);
        
        await client.query('COMMIT');
        
        return result.rows;
        
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}



// Exportamos las funciones para usarlas en las rutas
export { getTopSuppliers };

