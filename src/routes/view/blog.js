/**
 * @description 微博 view 路由
 * @author  rq
 */

 const router = require('koa-router')()
 const { loginRedirect } = require('../../middlewares/loginCheck');
 const { getProfileBlogList } = require('../../controller/blog-profile');
//  const { getFans, getFollowers } = require('../../controller/user-relation')
 const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation');
const { isExist } = require('../../controller/user');
const { getHomeBlogList } = require('../../controller/blog-home');
const { getAtMeCount,getAtMeBlogList, markAsRead } = require('../../controller/blog-at');
 router.get('/',loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList({ userId });
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    // 获取@数量
    const atCountResult  = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data;
    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: { 
            isEmpty, 
            blogList, 
            pageSize, 
            pageIndex, 
            count 
        }
    })
 })

 router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo;
    ctx.redirect(`/profile/${userName}`)
 })

 // 个人主页
 router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 当前登录用户信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName: curUserName } = ctx.params
    const isMe = myUserName === curUserName
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        const existResult = await isExist(curUserName);
        if (existResult.errno !== 0) {
            return 
        }
        curUserInfo = existResult.data
    }

    // 获取微博第一页数据
    // controller
    const result = await getProfileBlogList(curUserName, 0);
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data 
    
    // 获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const {count: fansCount, fansList } = fansResult.data;
    
    // 获取关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    // 我是否关注了此人
    const amIFollowed = fansList.some(item => item.userName === myUserName)

    const { count: followersCount, followersList } = followersResult.data

     // 获取@数量
     const atCountResult  = await getAtMeCount(myUserInfo.id)
     const { count: atCount } = atCountResult.data;


    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed,
            atCount
        }
    })
 })

 // 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

// atMe
router.get('/at-me', loginRedirect, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo;
    // 获取 @ 数量
    const atCountResult  = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data;

    // 获取第一页列表
    const result = await getAtMeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count} = result.data;
    // 标记为已读
    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty, blogList, pageSize, pageIndex, count
        }
    })

    // 标记为已读
    if (atCount > 0) {
        await markAsRead(userId)
    }
})

 module.exports = router;
