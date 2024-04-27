import Feedback from '../model/feedbackModel.js';

// Create feedback
export const createFeedback = async (req, res) => {
    try {
        const { userID, examID, rating, comment } = req.body;
        const feedback = new Feedback({
            userID,
            examID,
            rating,
            comment
        });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ message: 'Failed to submit feedback. Please try again later.' });
    }
};

// Get all feedback
export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error getting feedback:', error);
        res.status(500).json({ message: 'Failed to fetch feedback.' });
    }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error getting feedback by ID:', error);
        res.status(500).json({ message: 'Failed to fetch feedback.' });
    }
};

// Update feedback by ID
export const updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }
        res.status(200).json({ message: 'Feedback updated successfully', updatedFeedback });
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).json({ message: 'Failed to update feedback.' });
    }
};

// Delete feedback by ID
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully', deletedFeedback });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Failed to delete feedback.' });
    }
};
