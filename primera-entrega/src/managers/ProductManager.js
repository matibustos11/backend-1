import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "products.json";
    }

    async $findOneById() {
        this.#products = await this.getAll();
        const productFound = this.#products.find((item) => item.id === Number(id));

        if (!productFound) {
            throw new Error("Id no encontrado");
        }
    }

    async getAll() {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
        } catch (error) {
            throw new Error("Falló al obtener todos los productos");
        }
    }

    async getOneById(id) {
        try {
            const productFound = await this.$findOneById(id);
            return productFound;
        } catch (error) {
            throw new Error("Falló al obtener el producto");
        }
    }

    async insertOne(data) {
        try {
            const { title, description, code, price, status, stock, category, thumbnail } = data;

            if (!title || status === undefined || status === null || !stock || !description || !code || !price || !category || !thumbnail ) {
                throw new Error("Faltan datos obligatorios");
            }

            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail,
            }

            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products)

            return productFound;
        } catch (error) {
            throw new Error("Falló al agregar un producto productos");
        }
    }

    async updateOneById(id, data) {
        try {
            const { title, description, code, price, status, stock, category, thumbnail } = data;
            const productFound = await this.$findOneById(id); 

            const product = {
                id: productFound.id,
                title: title ? title : productFound.title,
                description: description ? description : productFound.description,
                code: code ? code : productFound.code,
                price,
                status,
                stock,
                category,
                thumbnail,
            }

            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products)

            return productFound;
        } catch (error) {
            throw new Error("Falló al agregar un producto productos");
        }
    }

    
}