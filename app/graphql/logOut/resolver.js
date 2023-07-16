module.exports = {
    Query: {
        logOut(root, {id}, ctx) {
            return ctx.connector.logOut.logOut(id);
        },
    }
}