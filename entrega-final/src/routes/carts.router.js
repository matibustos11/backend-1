import { Router } from "express";
import uploader from "../utils/uploader.js";
import CartManager from "../managers/CartManager.js";

const router = Router ();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll(req.query);
        res.status(200).json({ status: "succes", payload: carts});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.get("/:id", async (req, res) => {
    try {
        const cart = await cartManager.getOneById(req.params?.id);
        res.status(200).json({ status: "succes", payload: cart});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
    
});

router.post("/", uploader.single("file"), async (req, res) => {
    try {
        const cart = await cartManager.insertOne(req.body, req.file);
        res.status(201).json({ status: "succes", payload: cart});
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }


    
});

router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartManager.addOneProduct(cid, pid, quantity || 1);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }

    
});

router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addOneProduct(cid, pid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const cartDeleted = await cartManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: cartDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id/products/:pid", async (req, res) => {
    try {
        const { id, pid: productId } = req.params;
        const cartDeleted = await cartManager.deleteOneProduct(id, productId);
        res.status(200).json({ status: true, payload: cartDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;