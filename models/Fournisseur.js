const mongoose = require("mongoose");

const FournisseurSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },

        contact:{
            type: String,
        },

        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Fournisseur", FournisseurSchema);