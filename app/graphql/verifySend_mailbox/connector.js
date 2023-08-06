const axios = require('axios');
function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}
module.exports = {
    verifySendMailbox: async (mobile, area) => {
        const randomNumber = getRandomNumber();
        if(randomNumber === 0){
            return {
                status: 'no',
                msg: '发送验证码失败-mailbox'
            };
        }
        if(randomNumber === 1){
            return {
                status: 'yes',
                msg: '成功发送验证码-mailbox'
            };
        }
        if(randomNumber === 2){
            return {
                status: 'error',
                msg: '无法验证是否发送成功-mailbox'
            };
        }
    }
};

