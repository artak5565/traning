const multer = require('multer')
const moment = require('moment')

const path = "./public/trainers";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const date = moment().format('DDMMYYY_HHmmss_SSS');
        cb(null, `${date}_${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/WebP") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter
})