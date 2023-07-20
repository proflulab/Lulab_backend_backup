module.exports = {
    Query: {
        logIn(root, {}, ctx) {
            return ctx.connector.logIn.logIn();
        },
    }
}