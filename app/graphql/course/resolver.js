'use strict';

module.exports = {
    Query: {
        courseCategory(root, { }, ctx) {
            return ctx.connector.course.category();
        },
        course(root, { category_id, page, limit }, ctx) {
            return ctx.connector.course.course(category_id, page, limit);
        },
        courseDetail(root, { course_id, skip, limit }, ctx) {
            return ctx.connector.course.courseDetail(course_id, skip, limit);
        },
        courseCatalogue(root, { course_id }, ctx) {
            return ctx.connector.course.courseCatalogue(course_id);
        },
        courseLink(root, { detail_id }, ctx) {
            return ctx.connector.course.courseLink(detail_id);
        },
    },
    // Mutation: {
    //   adduser(root, {
    //     username
    //   }, ctx) {
    //     return ctx.connector.user.add(username);
    //   },
    // }
};
