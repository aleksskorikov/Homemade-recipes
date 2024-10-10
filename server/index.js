

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import router from './routes/index.js';
import { sequelize } from './db.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
// app.use(express.static(path.resolve(__dirname, 'static')));
// app.use(express.static(path.join(__dirname, 'static')));
app.use('/static', express.static(path.join(__dirname, 'static')));




app.use('/api', router);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Error starting server:', e);
    }
};

start();
