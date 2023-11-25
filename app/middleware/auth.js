// app/middleware/auth.js

module.exports = (options, app) => {
    return async function authMiddleware(ctx, next) {
        const token = ctx.request.header.token;
        
        // 将 Token 添加到请求头
        if (token) {
          const decoded = ctx.service.jwt.verifyToken(token);
          if (decoded) {
            // Token 有效，将用户信息添加到请求上下文
            ctx.state.user = decoded;
            const userId = ctx.service.jwt.getUserIdFromToken(token);
            console.log(userId);
          } else {
            // Token 无效，可以根据需要执行适当的操作
            ctx.status = 401;
            ctx.body = { success: false, message: '令牌无效' };
            return;
          }
        } else {
          // 如果没有提供 Token，可以根据需要执行适当的操作
          ctx.status = 401;
          ctx.body = { success: false, message: '未提供令牌' };
          return;
        }
    
        await next();
    }
  };
  