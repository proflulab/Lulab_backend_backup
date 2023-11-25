'use strict';

const DataLoader = require('dataloader');

class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
          )
    }


    /**
     * courseCategory接口
     * @returns 理论课程，大咖会谈...
     */
    async category() {
        const { ctx, app } = this;
        const cors = await ctx.model.CourseCategory.find({}, { title: 1 }).sort({ sort: 1 });
        return cors;
    }

}
module.exports = LaunchConnector