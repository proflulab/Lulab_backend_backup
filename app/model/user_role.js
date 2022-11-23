module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // const d = new Date();

  const UserRoleSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  });


  return mongoose.model('UserRole', UserRoleSchema, 'userrole');
};
