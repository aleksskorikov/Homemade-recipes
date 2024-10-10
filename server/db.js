// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(
//         process.env.DB_NAME,
//         process.env.DB_USER,
//         process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )

// export { sequelize };

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log('Database Name:', process.env.DB_NAME);
console.log('Database User:', process.env.DB_USER);
console.log('Database Password:', process.env.DB_PASSWORD);
console.log('Database Host:', process.env.DB_HOST);
console.log('Database Port:', process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);

export { sequelize };
