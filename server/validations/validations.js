import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Минимум 4 сивола').isLength({ min: 3 }),
    body('fullName', 'Минимум 3 символа').isLength({ min: 3 }),
    body('avataraUrl', 'Не верный формат ссылки').optional().isURL(),
];

export const LoginValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Минимум 4 сивола').isLength({ min: 4 }),
    body('fullName', 'Минимум 3 символа').isLength({ min: 3 }),
    body('avataraUrl', 'Не верный формат ссылки').optional().isURL(),
];


