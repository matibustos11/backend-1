import { Router } from "express";
import uploader from "../utils/uploader.js";
import ProductManager from "../managers/ProductManager.js";

const router = Router ();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200).json({ status: "succes", payload: products});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params?.id);
        res.status(200).json({ status: "succes", payload: product});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.post("/", uploader.single("file"), async (req, res) => {
    try {
        const product = await productManager.insertOne(req.body, req.file);
        res.status(201).json({ status: "succes", payload: product});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.put("/:pid", uploader.single("file"),  async (req, res) => {
    try {
        const product = await productManager.updateOneById(req.params?.id, req.body, req.file);
        res.status(200).json({ status: "succes", payload: product});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.delete("/:pid", async (req, res) => {
    try {
        await productManager.deleteOneById(req.params?.id);
        res.status(200).json({ status: "succes"});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

export default router;