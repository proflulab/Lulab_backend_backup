'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

class SecretService extends Service {
  reversibleEncrypt(data, isEncrypt) {
    const {
      config
    } = this;
    const cipher = crypto.createCipheriv('aes-128-cbc', config.crypto.key, config.crypto.iv);
    if (isEncrypt) {
      cipher.update(data, 'utf8', 'hex');
      return cipher.final('hex');
    } else {
      cipher.update(data, 'hex', 'utf8')
      return cipher.final().toString();
    }
  }

  sha512(data) {
    var hash = crypto.createHash('sha512');
    hash.update(data);
    var res = hash.digest('hex');
    return res
  }

  saltHash(data, salt1, salt2) {
    var saltHash1 = bcrypt.hashSync(this.sha512(data), salt1);
    var saltHash2 = this.sha512(saltHash1 + salt2);
    return saltHash2;
  }

  generateSalt(saltRound1, saltRound2){
    return [bcrypt.genSaltSync(saltRound1), bcrypt.genSaltSync(saltRound2)];
  }
}

module.exports = SecretService;