
const Service = require('egg').Service;
// const jwt = require('jsonwebtoken');
const UUID = require('uuid').v4;
const dayjs = require('dayjs');
class JwtService extends Service {
  // 生成 Token
  async createToken(userId, secret, expire) {
    const now = dayjs().unix();
    return this.app.jwt.sign({
        aud: 'http://127.0.0.1',
        iss: '',
        jti: UUID(),
        iat: now,
        nbf: now,
        exp: now + expire,
        uid: userId,
    }, secret);
}


  async generateToken(userId) {
    const config = this.app.config.jwt;
     return {
      token: await this.createToken(userId, config.secret, config.expire),
      refresh_token: await this.createToken(userId, config.refresh_secret, config.refresh_expire),
     }
    //this.app.jwt.sign({ userId: userId }, this.app.config.jwt.secret, { expiresIn: 60 * 60 })
  }

  // 验证 Token
  async verifyToken(token, secret) {
    if (!token) {
        this.ctx.response.body = {
            error: 'Fail to auth request due to exception: ',
            code: 100,
        };
        return false;
        // throw new AuthException();
    }
    try {
      const decoded = this.app.jwt.verify(token, secret);
        // 验证令牌是否已过期
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && currentTime > decoded.exp) {
        return null; // 令牌已过期
      }

      return decoded;
    } catch (err) {
      return null;
    }
  }

  async refreshToken(refreshToken) {
    const userId = await this.getUserIdFromToken(refreshToken, true);
    if (!userId) {
        return false;
    }
    const token = await this.createToken(userId.userid, this.app.config.jwt.secret, this.app.config.jwt.expire);
    return {
        token,  
        refresh_token: refreshToken,
    };
}

  // 从 Token 中获取用户ID
  getUserIdFromToken(token, secret) {
    const result = this.verifyToken(token, secret);
    if (!result) {
      return false;
  }
  const res = this.app.jwt.decode(token);
  return res;
}

async reToken(token) {
  if (token === undefined) {
      this.ctx.response.body = { message: '令牌为空，请登陆获取！' };
      this.ctx.status = 401;
      return;
  }
  return token.replace(/^Bearer\s/, '');
}

}

module.exports = JwtService;
