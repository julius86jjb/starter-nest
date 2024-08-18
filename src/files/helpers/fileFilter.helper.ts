export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

   if (!file) return callback(new Error('File is empty'), false)

   const fileExt = file.mimetype.split('/')[1];
   const validExtds = ['jpg','png', 'gif','jpeg']

   if (validExtds.includes(fileExt)) return callback(null, true)

   callback(null, false)
}