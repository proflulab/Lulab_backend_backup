'use strict';

const ObjectId = require('mongodb').ObjectId;

class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * courseCategory接口
     * @returns 理论课程，大咖会谈...
     */
    async category() {
        const { ctx, app } = this;
        return ctx.model.CourseCategory.find({}, { title: 1 })
          .sort({ sort: 1 });
        // return {
        //     _id: "658d67f183748b286a079ed0",
        //     title: "理论课程",
        // };
    }

    /**
     * 返回课程列表
     * @param {String} category_id 课程分类编号
     * @param {Int} page 请求页数
     * @param {Int} limit 每页请求个数
     * @return {} 返回课程数据
     */
    async course(category_id, page = 1, limit = 6) {
        try {
            const { ctx, app } = this;
            console.log(ctx.request.body);
            const skip = (page - 1) * limit;
            const cors = await ctx.model.Course.aggregate([
                {
                    $match: {
                        category_id: new ObjectId(category_id),
                    },
                },
                {
                    $sort: { sort: 1 },
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
            ]);

            console.log(JSON.stringify(cors));
            return cors;
        } catch (err) {
            console.log('查询错误', err);
            // 如果有错误，你可以选择抛出错误或返回一个默认值
            throw err;
            // 或者返回一个默认值
            // return defaultValue;
        }
    }

    /**
     * 大课下的小课目录
     * @param {String} course_id
     * @returns
     */
    async courseCatalogue(course_id) {
        try {
          const catalogue = await this.ctx.model.CourseDetail.find(
            { course_id: new ObjectId(course_id) },
            { title: 1, duration: 1, free: 1 }
          ).sort({ sort: 1 });

          console.log(JSON.stringify(catalogue));
          return catalogue;
        } catch (err) {
          console.log('查询错误', err);
          // 如果有错误，你可以选择抛出错误或返回一个默认值
          throw err;
          // 或者返回一个默认值
          // return defaultValue;
        }
      }

    /**
     * 从七牛云查询小课的播放链接
     * @param {String} detail_id 小课id
     * @returns
     */
    async courseLink(detail_id) {
        return {
            link:'https://media.w3.org/2010/05/sintel/trailer.mp4'
        }
}
}
module.exports = LaunchConnector
