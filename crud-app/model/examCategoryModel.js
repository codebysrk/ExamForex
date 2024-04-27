// examCategoryModel.js
import mongoose from "mongoose";

const examCategorySchema = new mongoose.Schema({
  categoryImage: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  categoryDesc: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExamCategory = mongoose.model("ExamCategory", examCategorySchema);

export default ExamCategory;
