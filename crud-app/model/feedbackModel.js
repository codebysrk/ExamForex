import mongoose from 'mongoose';

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    examID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam', // Reference to the Exam model
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
