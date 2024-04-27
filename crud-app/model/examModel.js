import mongoose from 'mongoose';

const { Schema } = mongoose;

const ExamSchema = new Schema({
  examName: {
    type: String,
    required: true
  },
  examCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamCategory', // Reference to ExamCategory model
    required: true
  },
  questions: [{
    text: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    correctOptionIndex: {
      type: Number,
      required: true
    }
  }],
  duration: {
    type: Number, // Assuming duration is in minutes or seconds
    required: true
  },
  examImage: {
    type: String, // Assuming the image will be stored as a URL
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Exam = mongoose.model('Exam', ExamSchema);

export default Exam;
