// app/graphql/resolver.js

module.exports = {
    Query: {
        loginPassword(root, args, ctx) {
            return ctx.connector.loginPassword(args.mobile, args.area, args.password);
        },
    }
}
