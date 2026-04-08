const mongoose = require("mongoose");

const FactureSchema = new mongoose.Schema(
    {
        Fornisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fournisseur",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },
        
        dueDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["unpaid", "partially_paid", "paid"],
            default: "unpaid",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Facture", FactureSchema);