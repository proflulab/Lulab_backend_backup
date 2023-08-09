module.exports = {
    Query: {
        goodInfo(root,{}, ctx) {
            return ctx.connector.pay.goodInfo();
        },
        refund(root, { orderid, reason, description }, ctx) {
            // Call the mockRefund function from the connector with the provided arguments
            return ctx.connector.pay.refund(orderid, reason, description);
        },
        orderInfo(root, { }, ctx) {
            // Fetch order information using the connector function
            return ctx.connector.pay.orderInfo();
        },
        orderDrtail: (root, { orderID }, ctx) => {
            return ctx.connector.pay.orderDetail(orderID);
        }
    }
}
