require("dotenv").config();
const client = new (require("discord.js").Client);
require("./index")(client);

client.on("message", async (message) => {
    console.log(await client.user.getUserBanner("269870630738853888"))
})

client.login(process.env.TOKEN);