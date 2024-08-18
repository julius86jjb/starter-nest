import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

import { v4 as uuid } from 'uuid'

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File, type: string): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: type,
          public_id: uuid(),
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif']
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}