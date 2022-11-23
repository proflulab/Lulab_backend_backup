module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const OrderSchema = new Schema({
    title: { type: String },
    uid: { type: Schema.Types.ObjectId },
    goods_id: { type: Schema.Types.ObjectId },
    description: { type: String },
    price: { type: Number },
    orderNumber: { type: Number },
    methods: { type: Number }, // 支付方式
    seller_email: { type: String },
    status: { type: Number, default: 1 },
  }, {
    timestamps: true,
  });

  const Order = mongoose.model('Order', OrderSchema, 'order');
  return Order;
};

