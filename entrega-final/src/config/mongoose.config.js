import { connect, Types } from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://matibustos:123456mb@backend1.jdwvm.mongodb.net/Backend1";

    try {
        await connect(URL);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectar con MongoDB", error.message);
    }
};

export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};