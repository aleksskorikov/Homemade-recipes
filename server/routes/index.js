import Router from 'express';
import Recipe from './Recipe.js';

const router = new Router();

router.use('/recipe', Recipe);

export default router;


