module.exports = {
    Query:{
        courseCategory(root, { }, ctx) {
            return ctx.connector.course.category();
        },
        course(root, { category_id, page, limit }, ctx) {
            return ctx.connector.course.course(category_id, page, limit);
        },
        courseCatalogue(root, { course_id }, ctx) {
            return ctx.connector.course.courseCatalogue(course_id);
        },
        courseLink(root, { detail_id }, ctx) {
            return ctx.connector.course.courseLink(detail_id);
        },
    }
}