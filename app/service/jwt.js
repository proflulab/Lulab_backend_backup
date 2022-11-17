'use strict';

const UUID = require('uuid').v4;
const dayjs = require('dayjs');
const Service = require('egg').Service;
// const AuthException = require('../exception/auth');

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

  // iss：令牌颁发者。表示该令牌由谁创建，该声明是一个字符串
  // sub:  Subject Identifier，iss提供的终端用户的标识，在iss范围内唯一，最长为255个ASCII个字符，区分大小写
  // aud：Audience(s)，令牌的受众，分大小写的字符串数组
  // exp：Expiration time，令牌的过期时间戳。超过此时间的token会作废， 该声明是一个整数，是1970年1月1日以来的秒数
  // iat: 令牌的颁发时间，该声明是一个整数，是1970年1月1日以来的秒数
  // jti: 令牌的唯一标识，该声明的值在令牌颁发者创建的每一个令牌中都是唯一的，为了防止冲突，它通常是一个密码学随机值。这个值相当于向结构化令牌中加入了一个攻击者无法获得的随机熵组件，有利于防止令牌猜测攻击和重放攻击。

  async awardToken(userId) {
    const config = this.app.config.jwt;
    return {
      token: await this.createToken(userId, config.secret, config.expire),
      refresh_token: await this.createToken(userId, config.refresh_secret, config.refresh_expire),
    };
  }

  async refreshToken(refreshToken) {
    const userId = await this.getUserIdFromToken(refreshToken, true);
    if (!userId) {
      return false;
    }
    const token = await this.createToken(userId.uid, this.app.config.jwt.secret, this.app.config.jwt.expire);
    return {
      token,
      refresh_token: refreshToken,
    };
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
