import mongoose from 'mongoose';


const recordSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    borrowerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    borrowedDate: {
        type: Date,
        default: Date.now,
    },

    dueDate: {
        type: Date,
        default: function () {
            const borrowed = this.borrowedDate || new Date();
            return new Date(borrowed.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days later
        },
    },

},
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);




export const Record = mongoose.model('Record', recordSchema);