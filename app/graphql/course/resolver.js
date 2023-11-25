module.exports = {
    Query:{
        courseCategory(root, { }, ctx) {
            return ctx.connector.course.category();
        },
    }
}