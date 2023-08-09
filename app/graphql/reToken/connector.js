// connector.js

// This is a mock implementation since we are not connecting to any API or database.
// In a real application, this is where you would make API calls to refresh the token.

// const reToken = async (token) => {
//     // Mock implementation to return a new access token and refresh token
//     const newAccessToken = "NEW_ACCESS_TOKEN";
//     const newRefreshToken = "NEW_REFRESH_TOKEN";

//     return {
//         token: newAccessToken,
//         refresh_token: newRefreshToken,
//     };
// };

// module.exports = { reToken };

const DataLoader= require('dataloader')


class LaunchConnector {
    constructor(ctx) {
        this.ctx = ctx;
        this.loader = new DataLoader(
            ids => this.fetch(ids)
        );
    }
	async reToken(token) {
        const { ctx } = this;
        return await ctx.service.jwt.reToken(token);
    }
	}

module.exports = LaunchConnector;