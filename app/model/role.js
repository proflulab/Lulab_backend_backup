module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const RoleSchema = new Schema({
        name: { type: String },
        noaccess: { type: [String] },
    }, {
        timestamps: true,
    });


    return mongoose.model('Role', RoleSchema, 'role');
};
