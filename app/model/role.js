module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleSchema = new Schema({
    name: { type: String },
    code: { type: String },
    dsc: { type: String },
    /**
     * 是否启用
     * 0：禁用
     * 1：启用
     */
    status: { type: Number, default: 1 },
  }, {
    timestamps: true,
  });


  return mongoose.model('Role', RoleSchema, 'role');
};
