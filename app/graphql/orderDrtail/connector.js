const orders = [
    {
        orderID: "1",
        reason: "Product damaged",
        afterNumber: "A123456",
        orderStatus: "Refunded",
        applyTime: "2023-07-01 "
    },
    {
        orderID: "2",
        reason: "Changed mind",
        afterNumber: "B789012",
        orderStatus: "Canceled",
        applyTime: "2023-07-02 "
    },
    // Add more sample data here if needed
];

const getOrderDetail = (orderID) => {
    return orders.find(order => order.orderID === orderID);
};

module.exports = {
    getOrderDetail,
};
