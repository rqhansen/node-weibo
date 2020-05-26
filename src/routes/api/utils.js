
/**
 * @description utils api路由
 * @author rq
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginCheck'); 
const KoaForm  =  require('formidable-upload-koa');
const { saveFile } = require('../../controller/utils');

router.prefix('/api/utils');

// 上传图片 ， 经过KoaForm中间件时，文件已经存在服务器上了
router.post('/upload', loginCheck, KoaForm(), async (ctx, next) => {
    // console.log(ctx.req.files);
    // return;
    const file = ctx.req.files['file'];
    const { size, path, name, type } = file; // path表示上传到服务器上的临时路径
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router;
