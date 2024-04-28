import mongoose from "mongoose";

const personSchema = mongoose.Schema(
    {
        document: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        apellidoPaterno: {
            type: String,
            required: true,
        },
        apellidoMaterno: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Person = mongoose.model('Person', personSchema)