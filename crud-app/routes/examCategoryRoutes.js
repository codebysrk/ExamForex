// examCategoryRoutes.js
import express from 'express';
import { getExamCategories, createExamCategory, updateExamCategory, deleteExamCategory } from '../controller/examCategoryController.js';

const router = express.Router();

router.get('/', getExamCategories);
router.post('/', createExamCategory);
router.put('/:id', updateExamCategory);
router.delete('/:id', deleteExamCategory);

export default router;
