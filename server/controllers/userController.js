import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { fileURLToPath } from 'url';
import UserModel from '../models/user.js';
import path from 'path';
import fs from 'fs';
import RecipeModel from '../models/recire.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует." });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const avatarUrl = req.file ? req.file.path : null;

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl, 
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || '1234',
            { expiresIn: '30d' }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        });
    }
};


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин или пароль",
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || '1234',
            { expiresIn: '30d' }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({
            message: "Не удалось авторизоваться",
        });
    }
};


export const getMe = async (req, res) => {
    try {
        
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);

    } catch (err) {
        console.error('Error during getMe:', err);
        res.status(500).json({
            message: "Нет доступа",
        });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const userId = req.userId; 
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден." });
        }

        const recipes = await RecipeModel.find({ user: userId }); 

        for (const recipe of recipes) {
            if (recipe.imgUrl) { 
                const imagePath = path.join('uploads', path.basename(recipe.imgUrl));
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении изображения рецепта:', err);
                    } else {
                        console.log(`Изображение рецепта ${recipe._id} успешно удалено.`);
                    }
                });
            }
        }

        const deletedRecipes = await RecipeModel.deleteMany({ user: userId }); 

        if (user.avatarUrl) {
            const avatarPath = path.join('uploads', path.basename(user.avatarUrl));
            fs.unlink(avatarPath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении изображения пользователя:', err);
                }
            });
        }

        await UserModel.findByIdAndDelete(userId); 
        res.json({ message: "Пользователь и его рецепты успешно удалены." });
    } catch (err) {
        console.error('Ошибка при удалении пользователя:', err);
        res.status(500).json({ message: "Не удалось удалить пользователя." });
    }
};



export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName, email } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден." });
        }

        const avatarUrl = req.file ? `uploads/${req.file.filename}` : user.avatarUrl;

        if (user.avatarUrl && req.file) {
            const oldAvatarPath = path.join(__dirname, '..', user.avatarUrl);
            fs.unlink(oldAvatarPath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении старого изображения:', err);
                } else {
                    console.log(`Старое изображение ${oldAvatarPath} успешно удалено.`);
                }
            });
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.avatarUrl = avatarUrl; 

        await user.save();

        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    } catch (err) {
        console.error('Ошибка при обновлении данных пользователя:', err);
        res.status(500).json({ message: "Не удалось обновить данные пользователя." });
    }
};


