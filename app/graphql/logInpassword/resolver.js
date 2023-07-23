module.exports = {
    Query: {
        loginPassword(root, { mobile, area, password }, ctx) {
            return ctx.connector.logInpassword.loginPassword(mobile, area, password);
        },
    }
}