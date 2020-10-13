const sizeOf = require('image-size');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment')
const FileSystemHelper = require('../helpers/file-system-helper')

class MediaRepository {


    uploadImageIfExists(req, res, next) {

        const regex = /^data:((\w+)\/(\w+));base64,(.*)$/
        if (req.body.image != '' && regex.test(req.body.image)) {

            var date = new Date()
            var imageName = req.imageFor + '-' + date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds() + ".jpg"
            var imgSource = req.body.image.match(regex)[4];
            if (!fs.existsSync('./static/images/uploads/' + req.body.folder)) {
                fs.mkdirSync('./static/images/uploads/' + req.body.folder)
            }
            var imageUri = '/images/uploads/' + req.body.folder + '/' + imageName;
            var b = fs.writeFileSync('./static' + imageUri, imgSource, {
                encoding: 'base64'
            })
            req.image = imageUri;
        } else {
            req.image = null;
        }
        next()

    }


    uploadHeaderImageIfExists(req, res, next) {

        const regex = /^data:((\w+)\/(\w+));base64,(.*)$/
        if (req.body.headerCroppedImage && req.body.headerCroppedImage != '' && regex.test(req.body.headerCroppedImage)) {


            var date = new Date()
            var imageName = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds() + ".jpg"
            var imgSource = req.body.headerCroppedImage.match(regex)[4];
            if (!fs.existsSync('./static/images/uploads/invests/headers')) {
                fs.mkdirSync('./static/images/uploads/invests/headers')
            }
            var imageUri = '/images/uploads/invests/headers/' + imageName;
            var b = fs.writeFileSync('./static' + imageUri, imgSource, {
                encoding: 'base64'
            })
            var size = sizeOf('./static' + imageUri)
            req.headerImage = { image: imageUri, sizeString: size.width + 'x' + size.height };
        } else {
            req.headerImage = null;
        }
        next()

    }

    uploadHorizontalImageIfExists(req, res, next) {

        // console.log(req.body.imageIntro)

        const regex = /^data:((\w+)\/(\w+));base64,(.*)$/
        if (req.body.horizontCroppedImage && req.body.horizontCroppedImage != '' && regex.test(req.body.horizontCroppedImage)) {

            var date = new Date()
            var imageName = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds() + ".jpg"
            var imgSource = req.body.horizontCroppedImage.match(regex)[4];
            if (!fs.existsSync('./static/images/uploads/invests/horizonts')) {
                fs.mkdirSync('./static/images/uploads/invests/horizonts')
            }
            var imageUri = '/images/uploads/invests/horizonts/' + imageName;
            var b = fs.writeFileSync('./static' + imageUri, imgSource, {
                encoding: 'base64'
            })
            req.horizontImage = imageUri;
        } else {
            req.horizontImage = null;
        }
        next()

    }


    uploadSlideIfExists(req, res, next) {

        const regex = /^data:((\w+)\/(\w+));base64,(.*)$/
        if (req.body.slideImage && req.body.slideImage != '' && regex.test(req.body.slideImage)) {

            var date = new Date()
            var imageName = date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds() + ".jpg"
            var imgSource = req.body.slideImage.match(regex)[4];
            if (!fs.existsSync('./static/images/uploads/slides')) {
                fs.mkdirSync('./static/images/uploads/slides')
            }
            var imageUri = '/images/uploads/slides/' + imageName;
            var b = fs.writeFileSync('./static' + imageUri, imgSource, {
                encoding: 'base64'
            })
            req.slideImage = imageUri;
        }
        next()

    }


    uploadMapImageIfExists(req, res, next) {

        // console.log(req.body.imageIntro)

        req.map = { image: null, imageBig: null, sizeString: null }

        const regex = /^data:((\w+)\/(\w+));base64,(.*)$/
        if (req.body.mapCroppedImage.image && req.body.mapCroppedImage.image != '' && regex.test(req.body.mapCroppedImage.image)) {

            var date = new Date()
            var imageName = 'small-' + date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds() + ".jpg"
            var imgSource = req.body.mapCroppedImage.image.match(regex)[4];
            if (!fs.existsSync('./static/images/uploads/maps')) {
                fs.mkdirSync('./static/images/uploads/maps')
            }
            var imageUri = '/images/uploads/maps/' + imageName;
            var b = fs.writeFileSync('./static' + imageUri, imgSource, {
                encoding: 'base64'
            })
            req.map.image = imageUri;
        } else {
            if (req.body.invest.map) {
                req.map.image = req.body.invest.map.image
            }
        }

        if (req.body.mapCroppedImage.imageBig && req.body.mapCroppedImage.imageBig != '' && regex.test(req.body.mapCroppedImage.imageBig)) {

            var date = new Date()
            var imageName = 'big-' + date.getFullYear() + '' + date.getMonth() + '' + date.getDate() + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds() + '' + date.getMilliseconds() + ".jpg"
            var imgSource = req.body.mapCroppedImage.imageBig.match(regex)[4];
            if (!fs.existsSync('./static/images/uploads/maps')) {
                fs.mkdirSync('./static/images/uploads/maps')
            }
            var imageUri = '/images/uploads/maps/' + imageName;
            var b = fs.writeFileSync('./static' + imageUri, imgSource, {
                encoding: 'base64'
            })
            var size = sizeOf('./static' + imageUri)
            req.map.imageBig = imageUri
            req.map.sizeString = size.width + 'x' + size.height
        } else {
            if (req.body.invest.map) {
                req.map.imageBig = req.body.invest.map.imageBig
                req.map.sizeString = req.body.invest.map.sizeString
            }
        }

        next()

    }


    beforePrepareDataToGallery(req, res, next) {
        var d = new Date();
        var folder = d.getFullYear() + '' +
            d.getMonth() + '' +
            d.getDate() + '' +
            d.getHours() + '' +
            d.getMinutes() + '' +
            d.getSeconds() + '' +
            d.getMilliseconds();

        req.galleryPath = './static/images/uploads/galleries/' + folder;
        req.images = [];
        next()
    }


    beforePrepareDataToFolder(req, res, next) {
        var d = new Date();
        var folder = d.getFullYear() + '' +
            d.getMonth() + '' +
            d.getDate() + '' +
            d.getHours() + '' +
            d.getMinutes() + '' +
            d.getSeconds() + '' +
            d.getMilliseconds();

        req.galleryPath = './static/images/uploads/' + req.params.folder;
        req.images = [];
        next()
    }


    afterUplaodGallery(req, res) {

        var images = Object.assign(req.images);
        var imagesPlus = [];

        images.forEach((element, i) => {
            var size = sizeOf('./static' + element.image);
            imagesPlus.push({
                image: element.image,
                sizeString: size.width + "x" + size.height
            })

        });


        return res.json(imagesPlus)
    }

    afterUplaodFolder(req, res) {
        return res.json(req.images)
    }


    prepareImageStorageUpload() {


        var storage = multer.diskStorage({

            destination: function (req, file, cb, res) {

                if (!fs.existsSync(req.galleryPath)) {
                    fs.mkdirSync(req.galleryPath)
                }
                var minPath = req.galleryPath.replace('./', '')
                cb(null, minPath);

            },

            filename: function (req, file, cb, res) {
                var d = new Date();
                var name = file.fieldname + '-' +
                    d.getFullYear() + '' +
                    d.getMonth() + '' +
                    d.getDate() + '' +
                    d.getHours() + '' +
                    d.getMinutes() + '' +
                    d.getSeconds() + '' +
                    d.getMilliseconds() +
                    path.extname(file.originalname);
                var imageLink = req.galleryPath.replace('./static', '')
                cb(null, name);
                req.images.push({
                    image: imageLink + '/' + name,
                    imageThumb: imageLink + '/' + name,
                    imageDesc: ''
                })
                return name;
            }
        });

        var upload = multer({
            storage: storage
        });

        return upload;

    }

    prepareImageStorageSimpleUpload() {


        var storage = multer.diskStorage({

            destination: function (req, file, cb, res) {

                if (!fs.existsSync(req.galleryPath)) {
                    fs.mkdirSync(req.galleryPath)
                }
                var minPath = req.galleryPath.replace('./', '')
                cb(null, minPath);

            },

            filename: function (req, file, cb, res) {
                var d = new Date();
                var name = file.fieldname + '-' +
                    d.getFullYear() + '' +
                    d.getMonth() + '' +
                    d.getDate() + '' +
                    d.getHours() + '' +
                    d.getMinutes() + '' +
                    d.getSeconds() + '' +
                    d.getMilliseconds() +
                    path.extname(file.originalname);

                var imageLink = req.galleryPath.replace('./static', '')

                cb(null, name);

                req.images.push(imageLink + '/' + name)

                return name;
            }
        });

        var upload = multer({
            storage: storage
        });

        return upload;

    }



    prepareFileSimpleUpload() {


        var storage = multer.diskStorage({

            destination: function (req, file, cb, res) {
                var suffix = FileSystemHelper.getFileSuffix(file.originalname);
                // console.log(file.originalname, suffix)

                if (suffix == 'pdf')
                    var minPath = '/uploads/invests/pdfs'

                if (suffix == 'jpg' || suffix == 'png' || suffix == 'jpeg' || suffix == 'JPG' || suffix == 'JPEG' || suffix == 'PNG')
                    var minPath = '/images/uploads/invests'


                req.minPath = minPath

                cb(null, './static' + minPath);

            },

            filename: function (req, file, cb, res) {
                var d = new Date();
                var name = file.fieldname + '-' +
                    d.getFullYear() + '' +
                    d.getMonth() + '' +
                    d.getDate() + '' +
                    d.getHours() + '' +
                    d.getMinutes() + '' +
                    d.getSeconds() + '' +
                    d.getMilliseconds() +
                    path.extname(file.originalname);

                req.fileMinPath = req.minPath + '/' + name
                req.fileName = name;
                req.fileSufix = FileSystemHelper.getFileSuffix(file.originalname);

                cb(null, name);

                return name;
            }
        });

        var upload = multer({
            storage: storage
        });

        return upload;

    }

    prepareFileStorageSimpleUpload() {


        var storage = multer.diskStorage({

            destination: function (req, file, cb, res) {

                cb(null, 'tmp');

            },

            filename: function (req, file, cb, res) {

                var temFileName = String(moment().unix())
                req.fileData = file
                req.fileData.suffix = FileSystemHelper.getFileSuffix(file.originalname)
                req.fileData.tmpFileName = temFileName

                //application/pdf
                //image/jpeg
                //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                //application/vnd.openxmlformats-officedocument.wordprocessingml.document
                //application/vnd.ms-excel

                cb(null, temFileName);

            }
        });

        var upload = multer({
            storage: storage
        });

        return upload;

    }

    getFolderFiles(req, res) {
        var files = []
        var folder = req.params.folder;
        fs.readdirSync('./static/images/uploads/' + folder).forEach(file => {
            files.push('/images/uploads/' + folder + '/' + file)
        })
        return res.json(files);
    }

    removeFile(req, res) {
        var file = req.body.file;
        var path = './static' + file;
        fs.unlinkSync(path)
        return res.json({
            success: true
        })
    }


}

module.exports = new MediaRepository()