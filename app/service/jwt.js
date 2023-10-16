
const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class JwtService extends Service {
  // 生成 Token
  async generateToken(userId) {
    const {app} = this;
    return jwt.sign({userId: userId}, app.config.jwt.secret, { expiresIn: '1d' });
  }

  // 验证 Token
  async verifyToken(token, secret) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      return null;
    }
  }

  // 从 Token 中获取用户ID
  getUserIdFromToken(token, secret) {
    const decoded = this.verifyToken(token, secret);
    if (!decoded) {
      return false;
  }
return decoded ? decoded.userId : null;
}
  }


module.exports = JwtService;
