'use strict';

module.exports = {
  Query: {
    orderInfo(root, { number }, ctx) {
      return ctx.connector.pay.fetchAll(number);
    },
  },
};
