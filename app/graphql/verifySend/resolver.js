
const SendsmsService = require("../../service/sendsms");
const SmsService = require("../../service/sms");
const { verifySend } = require("./connector");

module.exports  = {
    Mutation: {
        verifySend: async (root, { email }, ctx) => {
            // return ctx.connector.verifySend.verifySend(email);
            return await verifySend({ email });
        },
        resendCode(root, { email }, ctx) {
            const resendCodeService = new SmsService(ctx);
            return resendCodeService.resendCode(email);
            // return ctx.connector.verifySend.resendCode(email);
        }
    },
}
// module.exports = {
//     Mutation: {
//         verifySend(root, { email }, ctx) {
//             // return ctx.connector.verifySend.verifySend(email);
//             return this.verifySend({ email });
//         },
//         resendCode(root, { email }, ctx) {
//             return ctx.connector.verifySend.resendCode(email);
//         }
//     }
// };
