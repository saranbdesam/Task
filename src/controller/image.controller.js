const { deleteOne, findById } = require('../model/image.model');
const imgDb = require('../model/image.model');
const { errorMsgFormat, sucessFormat } = require('../utilities/msgFormat');

class image {
    //<--** Upload new image using Authentication token and User Id **-->
    async uploadImage(req, res) {
        try {
            let data = await imgDb.findOne({ user: req.user.id })
            if (data) return res.status(400).send(errorMsgFormat({ message: 'Image already uploaded..' }))
            let imgUrl = " ";
            if (req.file) {
                imgUrl = `./src/output/${req.file.filename}`;
                await new imgDb({
                    user: req.user.id,
                    image: imgUrl
                }).save()
                return res.status(200).send(sucessFormat({ message: `Image Created sucessfully..` }));
            }
            else {
                return res.status(400).send(errorMsgFormat({ message: 'Image not exsit..' }));
            };
        } catch (error) {
            return res.status(400).send(errorMsgFormat(error));
        }
    };
    //<--** View image using Authentication token and User Id **--> 
    async imgView(req, res) {
        try {
            const imgData = await imgDb.findOne({ user: req.user.id });
            if (!imgData) return res.status(400).send(errorMsgFormat({ message: 'Image not exists..' }))
            return res.status(200).send(sucessFormat(imgData));
        } catch (error) {
            return res.status(400).send(errorMsgFormat(error));
        }
    };
    //<--** Update new image using Authentication token and User Id **-->
    async updateImage(req, res) {
        try {
            const user = await imgDb.findOne({ user: req.user.id });
            if (!user) return res.status(400).send(errorMsgFormat({ message: 'Invalid Id..' }));
            let imgUrl = " ";
            imgUrl = `./src/output/${req.file.filename}`;
            await imgDb.findOneAndUpdate({ _id: user._id }, { image: imgUrl });
            return res.status(200).send(sucessFormat({ message: `Image updated sucessfully..` }));
        } catch (error) {
            return res.status(400).send(errorMsgFormat(error));
        }
    };
    //<--** Delete the image using Authentication token and User Id **-->
    async deleteImage(req, res) {
        try {
            const data = await imgDb.findOneAndDelete({ user: req.user.id });
            if (data) return res.status(200).send(sucessFormat({ message: 'Deleted Sucessfully' }));
            else return res.status(400).send(errorMsgFormat({ message: 'invalid Id...' }))
        } catch (error) {
            return res.status(400).send(errorMsgFormat(error));
        }
    };
};
module.exports = new image;