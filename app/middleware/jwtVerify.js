'use strict';

// 定制白名单
const whiteList = ['/user/login', '/user/register', '/user/mobileLogin'];

module.exports = (options) => {
    return async function (ctx, next) {
        if (!whiteList.some(item => item == ctx.request.url)) {//判断接口路径是否在白名单
            let token = ctx.request.header.authorization//拿到token
            if (token) {//如果token存在
                let decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)//解密token
                ctx.openid = decoded.id
                /*  if(decoded&&decoded.openid){
                      ctx.body={
                          code:0,
                          openid :decoded.openid
                      }
                  }else{
                      ctx.openid=decoded.openid//把openid存在ctx上，方便后续操作。
                     // await next()
                  }*/
            } else {
                ctx.body = {
                    code: 0,
                    msg: '没有token'
                }
            }
        } else {
            //await next()
        }
    }
}
