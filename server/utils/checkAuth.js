import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, '1234'); 
            req.userId = decoded._id; 
            next();
        } catch (e) {
            console.error('JWT verification error:', e); 
            return res.status(403).json({
                message: 'Нет доступа!!!!',
            });
        }
    } else {
        console.log('No token provided');
        return res.status(403).json({
            message: 'Нет доступа',
        });
    }
};





