import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, LoginValidation } from './validations/validations.js';
import pkg from 'body-parser';
import CheckAuth from './utils/checkAuth.js';
import * as UserControllers from './controllers/userController.js';
import * as RecipeController from './controllers/recipeController.js';
import multer from 'multer';
import cors from 'cors';

const { json } = pkg;

mongoose
    .connect('mongodb+srv://aleksandrskorikov123:0828@cluster0.s37zt.mongodb.net/recipes?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log('DB OK!') })
    .catch((err) => { console.log('Нет подключения!!!!', err) });
    
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    },
});

const upload = multer({ storage });

app.use(json());
app.use(cors());
app.use('/uploads', express.static('uploads')); 

app.post('/auth/login', LoginValidation, UserControllers.login);
app.post('/auth/register', upload.single('avatar'), registerValidation, UserControllers.register);
app.get('/auth/me', CheckAuth, UserControllers.getMe);
app.delete('/auth/delete', CheckAuth, UserControllers.deleteUser);


app.post('/upload', CheckAuth, upload.single('img'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    res.json({
        url: `/uploads/${req.file.filename}`,  
    });
});

app.get('/recipe', CheckAuth, RecipeController.getAll);
app.get('/recipe/:id', CheckAuth, RecipeController.getOne);
app.post('/recipe', CheckAuth, upload.single('img'), RecipeController.create);
app.delete('/recipe/:id', CheckAuth, RecipeController.deleteRecipe);
app.put('/recipe/:id', CheckAuth, upload.single('img'), RecipeController.update);
app.put('/auth/update', CheckAuth, upload.single('avatar'), UserControllers.updateUser);


app.listen(4444, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Сервер запущен: порт 4444');
});