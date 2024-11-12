import { Router } from "express";
import uploader from "../utils/uploader.js";

const router = Router ();
const products = [];

router.get("/", (req, res) => {
    res.status(200).json({ status: "succes", payload: pets});
});

router.post("/", uploader.single("file"), (req, res) => {
    const { name, specie } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).json({ status: "error", message: "Archivo no encontrado"});
    }

    const pet = {
        name,
        specie,
        thumbnail: file.filename,
    };

    pets.push(pet);

    res.status(201).json({ status: "succes", payload: pet});
});

router.post("/:index/code", (req, res) => {
    const { index } = req.params;
    const { code } = req.body;

    pets[index].code = code;
    res.status(201).json({ status: "succes", payload: pets[index] });
});

export default router;