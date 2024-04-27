import Exam from "../model/examModel.js";

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('examCategory');
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExam = async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.params.id, req.body);
    const updatedExam = await Exam.findById(req.params.id);
    res.json(updatedExam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getExams, createExam, updateExam, deleteExam };
