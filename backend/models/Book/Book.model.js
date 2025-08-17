import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    coverImage: {
        type: String,
        required: false,
    },
    condition: {
        type: String,
        enum: ['new', 'used'],
        required: true,
        default: 'used',
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    forSale: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});





export const Book = mongoose.model('Book', bookSchema);
