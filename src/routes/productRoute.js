import express from "express";
import { getTopProductsByCategory } from "../services/productService.js";

const router = express.Router();

// Endpoint para obtener los productos más vendidos por categoría
router.get('/top-products/:category', async (req, res) => {
    const category = req.params.category;
    console.log(category);
    
    try {
        const topProducts = await getTopProductsByCategory(category);
        res.json(topProducts);
    }
    catch (error) {
        console.error("Error al obtener los productos más vendidos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;