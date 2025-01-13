import { Router } from "express";
import uploader from "../utils/uploader.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router ();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: products});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.get("/:id", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload: product});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.post("/", uploader.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: "error", message: "Archivo no proporcionado" });
        }
        const product = await productManager.insertOne(req.body, req.file.filename);
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.put("/:id", uploader.single("file"), async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedData = req.body; 
        if (req.file) {
            updatedData.image = req.file.filename;
        }
        const updatedProduct = await productManager.updateOneById(id, updatedData);

        res.status(200).json({ status: "success", payload: updatedProduct });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await productManager.deleteOneById(req.params?.id);
        res.status(200).json({ status: "success"});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

export default router;