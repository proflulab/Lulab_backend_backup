'use strict';

module.exports = {
  Query: {
    qiniu(root, {}, ctx) {
      return ctx.connector.qinius.fetchAll();
    },
  },
};
