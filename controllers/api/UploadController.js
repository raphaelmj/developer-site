const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');
const FileSystemHelper = require('../../helpers/file-system-helper')

class AuthController {

    uploadSimpleFileEnd(req, res) {
        var typeFile = null
        var suffix = req.fileSufix
        var sizeString = null

        if (suffix == 'pdf') {
            typeFile = 'pdf'
        }
        if (suffix == 'jpg' || suffix == 'png' || suffix == 'jpeg' || suffix == 'JPG' || suffix == 'JPEG' || suffix == 'PNG') {
            var size = sizeOf('./static' + req.fileMinPath)
            console.log(size)
            sizeString = size.width + 'x' + size.height
            typeFile = 'image'
        }

        return res.json({
            typeFile,
            sizeString,
            file: req.fileMinPath
        })

    }

}

module.exports = new AuthController();