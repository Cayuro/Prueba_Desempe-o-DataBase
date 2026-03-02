
import { Router } from "express";
import {getCustomerPurchaseHistory} from "../services/clientService.js";

const router = Router();

router.get('/:id', async (req, res) => {
    try {
    
        const clients = await getCustomerPurchaseHistory(req.params.id);
        
        res.status(200).json({
            message: 'Clientes obtenidos exitosamente',
            count: clients.length,
            clients
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener clientes',
            error: error.message 
        });
    }
});

router.get('/:email/details', async (req, res) => {
    const { email } = req.params;
    
    try {
        const orders = await getTranscriptByEmail(email);
        
        // Si no existe el cliente, retornamos 404
        if (!orders) {
            return res.status(404).json({ 
                message: 'cliente no encontrado',
                searchedEmail: email 
            });
        }
        
        // ordenes completo
        res.status(200).json({
            message: 'Kardex obtenido exitosamente',
            orders
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al obtener el kardex',
            error: error.message 
        });
    }
});

export default router;
