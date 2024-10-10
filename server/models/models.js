
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Recipe = sequelize.define('recipe', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING, allowNull: true },
    block1Title: { type: DataTypes.STRING, allowNull: true }, 
    ingredientsBlock1: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true }, 
    block2Title: { type: DataTypes.STRING, allowNull: true }, 
    ingredientsBlock2: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true }, 
    description: { type: DataTypes.STRING, allowNull: true },
    bookID: { type: DataTypes.INTEGER, allowNull: false },
});

export {
    Recipe
};
