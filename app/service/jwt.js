'use strict';

const Service = require('egg').Service;
const UUID = require('uuid').v4;
const dayjs = require('dayjs');

class JwtService extends Service {
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

async verifyToken(token, isRefresh = false) {
  if (!token) {
      this.ctx.response.body = {
          error: 'Fail to auth request due to exception: ',
          code: 100,
      };
      return false;
      // throw new AuthException();
  }
  const secret = isRefresh ? this.app.config.jwt.refresh_secret : this.app.config.jwt.secret;
  try {
      await this.app.jwt.verify(token, secret);
  } catch (e) {
      if (e.message === 'jwt expired' && !isRefresh) {
          this.ctx.response.body = {
              error: 'Fail to auth request due to exception: ' + e,
              code: 100,
          };
          return false;
          // throw new AuthException('令牌过期', 10003);
      }
      this.ctx.response.body = {
          error: 'Fail to auth request due to exception: ' + e,
          code: 100,
      };
      return false;
      // throw new AuthException();
  }
  return true;
}

async getUserIdFromToken(token, isRefresh = false) {
  const result = await this.verifyToken(token, isRefresh);
  if (!result) {
      return false;
  }
  const res = await this.app.jwt.decode(token);
  return res;
}

}

module.exports = JwtService;
