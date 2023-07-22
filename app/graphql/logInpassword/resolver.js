module.exports = {
    Query: {
        logInpassword(root, {}, ctx) {
            return ctx.connector.logIn.logInpassword();
        },
    }
}