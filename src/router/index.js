const router = require('express').Router();
const userRouter = require('./user.router');
const imageRouter = require('./image.rouetr');

//Sign-Up and Sign-In 
router.use('/user',userRouter);
//Image CRUD Operations
router.use('/image',imageRouter);



module.exports = router;