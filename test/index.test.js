require("dotenv").config();
// Creating a new client.
const client = new (require("discord.js").Client);
// initializes the package.
require("../lib/index")(client);
const { ExtendedUser, GetUserBanner } = require("../lib/index")

client.on("message", async (message) => {
    console.log(message.author instanceof ExtendedUser);
    // Possible to get it from the ClientUser.
    console.log(await client.user.getUserBanner("269870630738853888"))
});

GetUserBanner("269870630738853888", {
    token: process.env.TOKEN
}).then(banner => console.log(banner));

client.login(process.env.TOKEN)