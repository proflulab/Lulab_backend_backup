'use strict';

module.exports = {
  Query: {
    orderInfo(root, {}, ctx) {
      return ctx.connector.alipay.fetchAll();
    }
  }
}
