'use strict'; 

module.exports = app => {
  const { ONBOARDING_STATUS } = require('../constant/user');
  const { USER_TYPE } = require('../constant/types');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const subDepartmentSchema = mongoose.Schema({
    name: { type: String },
  }, { _id : false });

  const departmentSchema = mongoose.Schema({
    name: { type: String },
    subDepartments: [subDepartmentSchema],
    location: { type: String },
  }, { _id : false });
  
  var credentialSchema = mongoose.Schema({
    clientType: String,
    openId: String,
    unionId: String,
    sessionKey: String, // wechat only
    accessToken: String, // internal access
  },{ _id : false });

  const UserSchema = new Schema({

    /*
      ----用户基本信息----
    */
    // 用户手机号码
    phone: { type: String },
    // 用户性别
    gender: { type: Number },
    // 用户邮箱
    email: { type: String },
    // 邮箱验证码
    emailVerificationCode: { type: String },
    // 用户头像
    avatar: { type: String },
    // 用户密码
    password: { type: String },
    // 用户密码所需盐1
    salt1: { type: String },
    // 用户密码所需盐2
    salt2: { type: String },
    // 用户省份
    province: { type: String },
    // 用户城市
    city: { type: String },
    // 用户出生年份
    birth: { type: Date },
    // 个人简介
    introduction: { type: String },
    // 用户真实姓名
    name: { type: String },
    // 用户昵称
    nickname: { type: String },
    // 个人简介
    introduction: { type: String },
    // 用户的职称
    title: { type: String },
    // 用户的组织机构
    organization: { type: Object, ref: 'Organization' },
    // 用户其它职称
    otherTitles: { type: Array, default: [] },
    departments: [departmentSchema],
    department: { type: String }, // deprecated
    // 专业资质
    qualification: { type: String },
    specialty: { type: String },
    specialtyTags: { type: Array, default: [] }, // TODO: 移除
    tags: { type: Array, default: [], ref: 'Tag', es_indexed: true },

    type: { type: String, enum: Object.values(USER_TYPE), default: USER_TYPE.DEFAULT },
    credential: [credentialSchema],

    onboardingStatus: { type: String, enum: Object.values(ONBOARDING_STATUS), default: ONBOARDING_STATUS.DEFAULT },
    circles: { type: Array, ref: 'Circle' },

    /*
      ----用户风控信息----
    */
    // 账户是否被屏蔽
    isBlocked: { type: Boolean, default: false },
    // 账户是否被激活
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    // 用户创建时间
    createdAt: { type: Date, default: Date.now },
    // 用户更新时间
    updatedAt: { type: Date, default: Date.now },
    loginedAt: { type: Date, default: Date.now },
    // 邮箱验证码过期时间
    emailVerificationCodeExpiredAt: { type: Date },
  });

  UserSchema.index({ "credential.openId": 1, "credential.openId": 1 });
  UserSchema.index({ accessToken: 1 });

  return mongoose.model('User', UserSchema);
};
