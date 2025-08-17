import multer from 'multer';
import multerS3 from 'multer-s3';
import { env } from '../env.js';
import s3 from './config/s3.js';

const storage = multerS3({
    s3,
    bucket: env.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}_${file.originalname}`);
    },
});


export const upload = multer({
    storage,
}).fields([{ name: 'coverImage', maxCount: 1 }]);