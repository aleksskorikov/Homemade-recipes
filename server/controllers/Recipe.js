import { v4 } from 'uuid';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Recipe } from '../models/models.js';
import fs from 'fs';
import path from 'path';
import { unlink } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class RecipeController {

async create(req, res) {
        try {
            const { name, ingredientsBlock1, ingredientsBlock2, description, bookID, block1Title, block2Title } = req.body;

            let parsedIngredientsBlock1 = [];
            let parsedIngredientsBlock2 = [];

            try {
                parsedIngredientsBlock1 = JSON.parse(ingredientsBlock1);
            } catch (e) {
                return res.status(400).json({ message: 'Неверный формат данных для ingredientsBlock1.' });
            }

            try {
                parsedIngredientsBlock2 = JSON.parse(ingredientsBlock2);
            } catch (e) {
                return res.status(400).json({ message: 'Неверный формат данных для ingredientsBlock2.' });
            }

            let fileName = null;

            if (req.files && req.files.img) {
                const { img } = req.files;
                fileName = v4() + ".jpg";
                const filePath = resolve(__dirname, '..', 'static', fileName);

                await new Promise((resolve, reject) => {
                    img.mv(filePath, (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
            }

            const recipe = await Recipe.create({
                name,
                ingredientsBlock1: parsedIngredientsBlock1,
                ingredientsBlock2: parsedIngredientsBlock2,
                description,
                img: fileName,
                bookID,
                block1Title, 
                block2Title  
            });

            return res.status(201).json(recipe);
        } catch (e) {
            console.error('Ошибка при создании рецепта:', e);
            return res.status(500).json({ message: 'Ошибка при создании рецепта.', error: e.message });
        }
    };

    async getAll(req, res) {
        try {
            let { bookID, limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = (page - 1) * limit;
            let recipes;

            if (!bookID) {
                recipes = await Recipe.findAndCountAll({ limit, offset });
            } else {
                recipes = await Recipe.findAndCountAll({ where: { bookID }, limit, offset });
            }

            return res.json(recipes);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при получении рецептов.', error: e.message });
        }
    };

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findByPk(id);

            if (!recipe) {
                return res.status(404).json({ message: 'Рецепт не найден.' });
            }

            return res.json(recipe);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при получении рецепта.', error: e.message });
        }
    };

    async deleteRecipe(req, res) {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findByPk(id);

            if (!recipe) {
                return res.status(404).json({ message: 'Рецепт не найден.' });
            }

            if (recipe.img) {
                const imagePath = path.join(__dirname, '..', 'static', recipe.img); 
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении изображения:', err);
                    } else {
                        console.log('Изображение успешно удалено');
                    }
                });
            }

            await recipe.destroy();
            return res.status(200).json({ message: 'Рецепт успешно удален.' });
        } catch (error) {
            console.error('Ошибка при удалении рецепта:', error);
            return res.status(500).json({ message: 'Ошибка при удалении рецепта.' });
        }
    };

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, ingredientsBlock1, ingredientsBlock2, description, bookID, block1Title, block2Title } = req.body;

            let parsedIngredientsBlock1 = [];
            let parsedIngredientsBlock2 = [];

            try {
                parsedIngredientsBlock1 = JSON.parse(ingredientsBlock1);
            } catch (e) {
                return res.status(400).json({ message: 'Неверный формат данных для ingredientsBlock1.' });
            }

            try {
                parsedIngredientsBlock2 = JSON.parse(ingredientsBlock2);
            } catch (e) {
                return res.status(400).json({ message: 'Неверный формат данных для ingredientsBlock2.' });
            }

            const recipe = await Recipe.findByPk(id);

            if (!recipe) {
                return res.status(404).json({ message: 'Рецепт не найден.' });
            }

            let fileName = recipe.img; 
            if (req.files && req.files.img) {
                const { img } = req.files;

                if (fileName) {
                    const oldFilePath = resolve(__dirname, '..', 'static', fileName);
                    try {
                        await unlink(oldFilePath);
                        console.log('Старое изображение успешно удалено');
                    } catch (err) {
                        console.error('Ошибка при удалении старого изображения:', err);
                    }
                }

                fileName = v4() + ".jpg";
                const filePath = resolve(__dirname, '..', 'static', fileName);

                await new Promise((resolve, reject) => {
                    img.mv(filePath, (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
            }

            recipe.name = name;
            recipe.ingredientsBlock1 = parsedIngredientsBlock1;
            recipe.ingredientsBlock2 = parsedIngredientsBlock2;
            recipe.description = description;
            recipe.img = fileName;
            recipe.bookID = bookID;
            recipe.block1Title = block1Title;
            recipe.block2Title = block2Title;

            await recipe.save();

            return res.json(recipe);
        } catch (e) {
            console.error('Ошибка при обновлении рецепта:', e);
            return res.status(500).json({ message: 'Ошибка при обновлении рецепта.', error: e.message });
        }
    };

}

export default new RecipeController();





