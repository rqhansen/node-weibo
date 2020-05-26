/**
 * @description utils controller
 * @author rq
 */
const path = require('path');
const { ErrorModel, SuccessModel } = require('../model/ResModel');
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const fse = require('fs-extra');

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');
const MIX_SIZE = 1024 * 1024 * 1024; // 文件最大体积1M

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH);
    }
})

/**
 * 
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径 
 */
 async function saveFile({name, type, size, filePath}) {
    if (size > MIX_SIZE) {
        await fse.remove(filePath);
        return new ErrorModel(uploadFileSizeFailInfo);
    }

    // 移动文件
    const fileName = Date.now() + '.' + name;
    const disFilePath = path.join(DIST_FOLDER_PATH, fileName);// 目的地
    await fse.move(filePath, disFilePath);
    // 返回信息 /2.png
    return new SuccessModel({
        url: '/' + fileName
    })
 }

 module.exports = {
     saveFile
 }