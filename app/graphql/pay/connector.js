const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
	goodInfo() {    
        const mockGoodInfo = {
            poster: "https://th.bing.com/th/id/R.1b23a35a4bf4d26e1d49a67c4f1f46f2?rik=H7l59IVhlljiEw&riu=http%3a%2f%2fpic34.photophoto.cn%2f20150128%2f0007020101830082_b.png&ehk=8FNhYl14mVz7HNfCZMc4qrKxM8ypIMyisDeMK82fv7Y%3d&risl=&pid=ImgRaw&r=0",
            goodsName: "TestGood",
            goodsPrice: 99.99,
        };
        return{
            mockGoodInfo 
        }
    }
     refund (orderid, reason, description) {
        // Perform any mock logic here
        return {
            status: "success",
            msg: "Refund request has been processed.",
        };
    };
    orderInfo() {
        // Assuming the data is fetched from a database, but here we just mock the response
        return {
            orderId: "12345",
            totalAmount: 100.0,
            goodsName: "Sample Product",
            payTime: "2023-07-12",
            orderStatus: "PAID"
        };
    }
    getOrderDetail = (orderID) => {
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
        return orders.find(order => order.orderID === orderID);
    };

}

module.exports = LaunchConnector;





