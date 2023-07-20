module.exports = {
    Query: {
        logOut(root, {}, ctx) {
            return ctx.connector.logOut.logOut();
        },
    }
}