'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async create(payLoad) {
    //与数据打交道
    return this.ctx.model.User.create(payLoad);
  }
  async index(){
    return this.ctx.model.User.find();
  }
  async detail(_id){
    return this.ctx.model.User.findById({_id})
  }
  async update(_id,payLoad) {
    return this.ctx.model.User.findByIdAndUpdate(_id,payLoad);
  }
  async delete(_id){
    return this.ctx.model.User.findByIdAndDelete(_id);
  }
}

module.exports = UserService;
