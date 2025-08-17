// config/s3.js
import { env } from '../../env.js';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
});

export default s3;