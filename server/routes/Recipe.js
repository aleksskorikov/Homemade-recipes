
import express from 'express';
import RecipeController from '../controllers/Recipe.js';

const router = express.Router();

router.post('/', RecipeController.create);
router.get('/', RecipeController.getAll);
router.get('/:id', RecipeController.getOne);
router.put('/:id', RecipeController.update);
router.delete('/:id', RecipeController.deleteRecipe);

export default router;
