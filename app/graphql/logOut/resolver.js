const UserService = require("../../service/user")

module.exports = {
    Query: {
        logOut(root, {}, ctx) {
            const userService = new UserService(ctx);
            return userService.logOut(); 
            // return ctx.connector.logOut.logOut();
        },
    }
}