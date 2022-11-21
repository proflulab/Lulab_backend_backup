'use strict';

const DataLoader = require('dataloader');
const ObjectId = require('mongodb').ObjectID;

class LaunchConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(ids => this.fetch(ids));
  }

  async fetch(ids) {
    return await this.ctx.model.User.find(
      null,
      null,
      { limit: 4 },
      function (err, docs) {
        // console.log(docs);
      }
    );
  }

  async fetchAll() {
    // console.log(this.ctx.model.User.find({ username: 'admin' }));
    // //await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
    // return await this.ctx.model.User.find();
  }


  async category() {
    const { ctx, app } = this;
    const cors = await ctx.model.CourseCategory.find({}, { title: 1 });
    return cors;
  }

  /**
   * 返回课程列表
   * @param {String} category_id 课程分类编号
   * @param {Int} page 请求页数
   * @param {Int} limit 每页请求个数
   * @return {} 返回课程数据
   */
  async course(category_id, page, limit) {
    const { ctx, app } = this;

    const skip = (page - 1) * limit;

    const cors = await ctx.model.Course.aggregate(
      [
        {
          $match: {
            category_id: ObjectId(category_id), // '6362d1e02bbfd16b331657ca'
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ],
      (err, docs) => {
        if (err) {
          console.log('查询错误');
        } else {
          console.log(JSON.stringify(docs));
          // console.log(docs);
        }
      }
    );

    return cors;
  }

  async courseDetail(course_id, skip, limit) {
    const { ctx, app } = this;

    const cors = await ctx.model.CourseDetail.aggregate(
      [
        {
          $match: {
            course_id: ObjectId(course_id), // '6362d1e02bbfd16b331657ca'
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ],
      (err, docs) => {
        if (err) {
          console.log('查询错误');
        } else {
          console.log(JSON.stringify(docs));
          // console.log(docs);
        }
      }
    );

    return cors;
  }

  async courseLink(detail_id) {
    const { ctx, app } = this;

    const cors = await ctx.model.CourseDetail.find(
      { _id: detail_id },
      { link: 1, _id: 0 },
      (err, docs) => {
        if (err) {
          console.log('查询错误');
        } else {
          // console.log(JSON.stringify(docs));
        }
      }
    );
    const getcode = await ctx.service.qiniu.qiniuDown(cors[0].link, 10);
    // console.log(cors.toString());
    return { link: getcode };
  }
}

module.exports = LaunchConnector;
