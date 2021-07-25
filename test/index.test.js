require("dotenv").config();
// Creating a new client.
require("../lib/index")(process.env.TOKEN);
const client = new (require("discord.js").Client);
// initializes the package.
const { ExtendedUser, GetUserBanner } = require("../lib/index")

client.on("message", async (message) => {
    console.log(message.author instanceof ExtendedUser);
    console.log(await message.author.bannerURL());
    // Possible to get it from the ClientUser.
    console.log(await client.user.bannerURL("269870630738853888"))
});

GetUserBanner("269870630738853888").then(banner => console.log(banner));

client.login(process.env.TOKEN)