module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // const d = new Date();

  const UserRoleSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId },
    role_id: { type: Schema.Types.ObjectId },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  });


  return mongoose.model('UserRole', UserRoleSchema, 'userrole');
};
