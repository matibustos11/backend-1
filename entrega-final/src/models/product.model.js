import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title:{
        type: String,
        required: function() {
            if (this.isNew) {
                return "El nombre del producto es obligatorio";
            }
            return false; 
        },
        trim: true,
        uppercase: true,
        maxLength: [ 25, "EL nombre debe tener como máximo 25 caracteres" ],
    },
    description:{
        type: String,
        required: function() {
            if (this.isNew) {
                return "La descripción del producto es obligatoria";
            }
            return false;
        },
        trim: true,
        maxLength: [ 50, "La descripción debe tener como máximo 50 caracteres" ],
    },
    category:{
        type: String,
        required: function() {
            if (this.isNew) {
                return "La categoría del producto es obligatoria";
            }
            return false;
        },
        trim: true,
        maxLength: [ 15, "La categoría debe tener como máximo 15 caracteres" ],
    },
    code:{
        type: String,
        required: function() {
            if (this.isNew) {
                return "El código del producto es obligatorio";
            }
            return false;
        },
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (code) {
                const countDocuments = await this.model("products").countDocuments({
                    _id:{ $ne: this._id },
                    code,
                });
                return countDocuments===0;
            },
            message: "El código ya está registrado",
        },
    },
    price:{
        type: Number,
        required: function() {
            if (this.isNew) {
                return "El precio del producto es obligatorio";
            }
            return false;
        },
        min: [ 0, "El precio debe ser un número positivo" ],
    },
    stock:{
        type: Number,
        required: function() {
            if (this.isNew) {
                return "El stock del producto es obligatorio";
            }
            return false;
        },
        min: [ 0, "El stock debe ser un número positivo" ],
    },
    status:{
        type: Boolean,
        required: function() {
            if (this.isNew) {
                return "El estado del producto es obligatorio";
            }
            return false;
        },
    },
    thumbnail:{
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;