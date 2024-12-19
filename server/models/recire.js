import mongoose from 'mongoose';

const Recipe = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    block1Title: {
        type: String,
        required: true,
    },
    ingredientsBlock1: {
        type: [String],
        default: [],
    },
    block2Title: {
        type: String,
        allowNull: true,
    },
    ingredientsBlock2: {
        type: [String],
        default: [],
        allowNull: true,
    },
    description: {
        type: String,
        allowNull: true,
    },
    bookID: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Recire', Recipe);



