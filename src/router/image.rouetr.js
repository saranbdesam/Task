const router = require('express').Router();
const auth = require('../middelware/auth');
const fileUpload = require('../middelware/image');
const image = require('../controller/image.controller');


router.post('/add', auth, fileUpload('./src/output'), async (req, res) => {
    image.uploadImage(req, res);
});
router.get('/imgView', auth, (req, res) => {
    image.imgView(req, res);
});
router.put('/update', auth, fileUpload('./src/output'), (req, res) => {
    image.updateImage(req, res);
});
router.delete('/delete', auth, (req, res) => {
    image.deleteImage(req, res);
});


module.exports = router;