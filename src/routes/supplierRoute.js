import { getTopSuppliers } from "../services/supplierService.js";
import { Router } from "express";

const router = Router();

router.get('/top', async (req, res) => {
    try {
        const suppliers = await getTopSuppliers();
        
        res.status(200).json({
            message: 'Proveedores obtenidos exitosamente',
            count: suppliers.length,
            suppliers
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener proveedores',
            error: error.message 
        });
    }
});

export default router;