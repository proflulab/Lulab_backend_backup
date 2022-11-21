module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();

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
    createdAt: {
      type: Number,
      default: d.getTime(),
    },
  }, {
    timestamps: true,
  });

  const Order = mongoose.model('Order', OrderSchema, 'order');
  return Order;
};

