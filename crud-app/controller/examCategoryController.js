// examCategoryController.js
import ExamCategory from "../model/examCategoryModel.js";

const getExamCategories = async (req, res) => {
  try {
    const examCategories = await ExamCategory.find();
    res.json(examCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExamCategory = async (req, res) => {
  try {
    const newExamCategory = new ExamCategory(req.body);
    await newExamCategory.save();
    res.status(201).json(newExamCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateExamCategory = async (req, res) => {
  try {
    await ExamCategory.findByIdAndUpdate(req.params.id, req.body);
    const updatedExamCategory = await ExamCategory.findById(req.params.id);
    res.json(updatedExamCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExamCategory = async (req, res) => {
  try {
    await ExamCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getExamCategories,
  createExamCategory,
  updateExamCategory,
  deleteExamCategory,
};
