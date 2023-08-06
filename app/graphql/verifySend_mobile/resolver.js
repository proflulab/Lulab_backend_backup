

module.exports = {
    Mutation: {
        verifySend(root, { email }, ctx) {
            return ctx.connector.verifySend.verifySend(email);
        },
        resendCode(root, { email }, ctx) {
            return ctx.connector.verifySend.resendCode(email);
        }
    }
};
