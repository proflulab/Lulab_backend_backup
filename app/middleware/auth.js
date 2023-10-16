// app/middleware/auth.js

const AuthService = require('../service/jwt');

module.exports = (options) => {
  return async function (ctx, next) {
    const token = ctx.request.header.token;

    // const payload = { userId: 123 }; // 替换为实际的用户信息
    // const authService = new AuthService();
    // const Token = authService.generateToken(token);
    
    // 将 Token 添加到请求头
    if (token) {
      const authService = new AuthService();
      const decoded = authService.verifyToken(token);

      if (decoded) {
        // Token 有效，将用户信息添加到请求上下文
        ctx.state.user = decoded;
        const userId = authService.getUserIdFromToken(token);
        console.log(userId);
      } else {
        // Token 无效，可以根据需要执行适当的操作
        ctx.body = 'Token 无效';
      }
    } else {
      // 如果没有提供 Token，可以根据需要执行适当的操作
      ctx.body = '未提供 Token';
    }

    await next();
}
}
  
 

