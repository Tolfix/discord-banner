require("dotenv").config();
// Creating a new client.
const client = new (require("discord.js").Client);
// initializes the package.
require("../index")(client);

client.on("message", async (message) => {
    // Possible to get it from the client.
    console.log(await client.user.getUserBanner("269870630738853888"))
});

client.login(process.env.TOKEN)