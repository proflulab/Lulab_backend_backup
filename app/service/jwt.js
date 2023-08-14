const jwt = require('jsonwebtoken');
const fs = require('fs');


   // 这里假设你有一个存储用户信息的数据库或数据源，这里使用一个简单的示例
const users = {
    'user123': {
      id: 'user123',
      username: 'john_doe',
      // 其他用户数据...
    },
    // 其他用户...
  };
  
  // 用于签名 JWT 的密钥，请根据实际需求进行设置
  const jwtSecret = 'your_secret_key';
  

  'use strict';

const Service = require('egg').Service;

class JwtService extends Service {
  // 创建 Token
  async createToken(user, secret) {
    const payload = {
      sub: user.id,
      username: user.username,
      // 其他用户数据...
    };
    return jwt.sign(payload, jwtSecret,{ expiresIn: '1h' },secret); // 1 小时过期
  }

  async awardToken(user) {
    const config = this.app.config.jwt;
    return {
        token: await this.createToken(user, config.secret),
        refresh_token: await this.createToken(user, config.refresh_secret),
    };
}
  
  // 刷新 Token
  async refreshToken(token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = users[decoded.sub];
      if (user) {
        return createToken(user);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  
  // 验证 Token 的有效性
  async verifyToken(token) {
    try {
      jwt.verify(token, jwtSecret);
      return true;
    } catch (err) {
      return false;
    }
  }
  
  // 获取用户信息
  async getUserInfoFromToken(token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = users[decoded.sub];
      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      throw new Error('Invalid token');
    }
}
    async reToken(token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = users[decoded.sub];
        if (user) {
          const newToken = createToken(user);
          const refreshToken = refreshToken(token);
          return { token: newToken, refresh_token: refreshToken };
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error('Invalid token');
      }
    }
  
  // 使用示例
//   const user = users['user123'];
//   const token = createToken(user);
//   console.log('Token:', token);
  
//   const refreshedToken = refreshToken(token);
//   console.log('Refreshed Token:', refreshedToken);
  
//   const valid = verifyToken(token);
//   console.log('Token is valid:', valid);
  
//   try {
//     const userInfo = getUserInfo(token);
//     console.log('User Info:', userInfo);
//   } catch (err) {
//     console.error('Error:', err.message);
//   }

}
module.exports = JwtService;

