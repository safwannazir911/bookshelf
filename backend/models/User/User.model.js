import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pincode: {
        type: String,
        required: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],

    //Borrow records & lending records

    borrowedBookRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record',
    }],

    lendingBookRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record',
    }],
},
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);




export const User = mongoose.model('User', userSchema);