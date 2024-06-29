import {
  v2 as cloudinary, UploadApiResponse,
  UploadApiErrorResponse
} from 'cloudinary';
import envConfig from './env.config';

cloudinary.config({
  cloud_name: 'dlgsjsoe2',
  api_key: '884745647853827',
  api_secret: envConfig.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary
