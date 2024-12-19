import RecipeModel from "../models/recire.js";
import fs from 'fs';
import path from 'path';


export const create = async (req, res) => {
    try {

        let ingredientsBlock1 = [];
        let ingredientsBlock2 = [];

        if (req.body.ingredientsBlock1 && isJsonString(req.body.ingredientsBlock1)) {
            ingredientsBlock1 = JSON.parse(req.body.ingredientsBlock1);
        } else {
            console.error('ingredientsBlock1 не является корректным JSON:', req.body.ingredientsBlock1);
        }

        if (req.body.ingredientsBlock2 && isJsonString(req.body.ingredientsBlock2)) {
            ingredientsBlock2 = JSON.parse(req.body.ingredientsBlock2);
        } else {
            console.error('ingredientsBlock2 не является корректным JSON:', req.body.ingredientsBlock2);
        }

        const existingRecipe = await RecipeModel.findOne({
            name: req.body.name,
            bookID: req.body.bookID,
        });

        if (existingRecipe) {
            return res.status(400).json({
                message: 'Рецепт с таким именем уже существует в этой книге',
            });
        }

        const doc = new RecipeModel({
            name: req.body.name,
            ingredientsBlock1,
            ingredientsBlock2,
            description: req.body.description,
            imgUrl: req.file ? `/uploads/${req.file.filename}` : '',
            bookID: req.body.bookID,
            block1Title: req.body.block1Title,
            block2Title: req.body.block2Title,
            user: req.userId
        });

        const recipe = await doc.save();

        res.json(recipe);
    } catch (e) {
        console.error('Ошибка при создании рецепта:', e);
        res.status(500).json({
            message: "Не удалось создать рецепт",
            error: e.message
        });
    }
};



export const getAll = async (req, res) => {
    try {
        const { userId } = req;
        const bookID = req.query.bookID;

        if (!bookID) {
            return res.status(400).json({ message: 'Не передан идентификатор книги (bookID)' });
        }

        const recipes = await RecipeModel.find({ user: userId, bookID }).populate('user').exec();

        res.json(recipes);
    } catch (e) {

        res.status(500).json({
            message: "Не удалось получить рецепты!!!",
        });
    }
};


export const getOne = async (req, res) => { 
    try {
        const recipeId = req.params.id;

        const doc = await RecipeModel.findOneAndUpdate(
            { _id: recipeId },
            {},
            { new: true } 
        );

        if (!doc) {
            return res.status(404).json({
                message: "Рецепт не найден!!",
            });
        }

        res.json(doc);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Не удалось получить рецепт!!!",
        });
    }
};

export const deleteRecipe = async (req, res) => { 
    try {
        const recipeId = req.params.id;

        console.log(`Попытка удаления рецепта с ID: ${recipeId}`);

        const doc = await RecipeModel.findOneAndDelete({ _id: recipeId });

        if (!doc) {
            console.log('Рецепт не найден!');
            return res.status(404).json({
                message: "Рецепт не найден!!",
            });
        }

        console.log('Рецепт найден и удалён:', doc);


        if (doc.imgUrl) {
            const imagePath = path.join('uploads', path.basename(doc.imgUrl)); 
            console.log('Путь к изображению для удаления:', imagePath);

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении изображения:', err);
                } else {
                    console.log('Изображение успешно удалено:', imagePath);
                }
            });
        }

        res.json({
            message: "Рецепт успешно удалён!",
            recipe: doc
        });
    } catch (err) {
        console.log('Ошибка при удалении рецепта:', err); 
        res.status(500).json({
            message: "Не удалось удалить рецепт!!!",
            error: err.message 
        });
    }
};


export const update = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const existingRecipe = await RecipeModel.findById(recipeId);

        if (!existingRecipe) {
            return res.status(404).json({ message: "Рецепт не найден!" });
        }

        if (existingRecipe.imgUrl) {
            const imagePath = path.join('uploads', path.basename(existingRecipe.imgUrl));

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении изображения:', err);
                } 
            });
        }

        let ingredientsBlock1 = [];
        let ingredientsBlock2 = [];

        if (req.body.ingredientsBlock1 && isJsonString(req.body.ingredientsBlock1)) {
            ingredientsBlock1 = JSON.parse(req.body.ingredientsBlock1);
        } else {
            console.error('ingredientsBlock1 не является корректным JSON:', req.body.ingredientsBlock1);
        }

        if (req.body.ingredientsBlock2 && isJsonString(req.body.ingredientsBlock2)) {
            ingredientsBlock2 = JSON.parse(req.body.ingredientsBlock2);
        } else {
            console.error('ingredientsBlock2 не является корректным JSON:', req.body.ingredientsBlock2);
        }

        const updatedData = {
            name: req.body.name,
            ingredientsBlock1,
            ingredientsBlock2,
            description: req.body.description,
            imgUrl: req.file ? `/uploads/${req.file.filename}` : existingRecipe.imgUrl, // сохраняем старое изображение, если нового нет
            bookID: req.body.bookID,
            block1Title: req.body.block1Title,
            block2Title: req.body.block2Title,
            user: req.userId
        };

        const doc = await RecipeModel.findOneAndUpdate(
            { _id: recipeId },
            updatedData,
            { new: true } 
        );

        if (!doc) {
            return res.status(404).json({ message: "Рецепт не найден!" });
        }

        res.json({
            message: "Рецепт успешно обновлён!",
            recipe: doc
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Не удалось обновить рецепт!" });
    }
};


const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

