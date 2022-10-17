const multer = require('multer');
const path = require('path')


const Stroage = (destination) => multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileUpload = (destination) => multer({
    storage: Stroage(destination),
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        }
        else {
            return cb(new Error("image type is invalid.."))
        }
    },
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    }
}).single('image')

module.exports = fileUpload;
