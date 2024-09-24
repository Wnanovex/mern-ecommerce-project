import express from 'express';// import express
const router = express.Router(); // using router
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp|jpg/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/jpg/;
    const extname = path.extname(file.originalname).toLocaleLowerCase()
    const mimetype = file.mimetype
    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
         cb(null, true);
    }else{
        cb(new Error('Only images are allowed'), false);
    }
}

const upload = multer({storage, fileFilter});
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    // multer setup
    uploadSingleImage(req, res, (err) => {
        if(err) {
            return res.status(400).send({message: err.message});
        }else if(req.file){
        res.status(200).send({
            message: 'Image uploaded successfully!',
            filePath: `/${req.file.path}`
        });
        }else{
            res.status(400).send({message: 'No file uploaded'});
        }
    })
})


export default router;