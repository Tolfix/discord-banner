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

console.time("first_time");
GetUserBanner("269870630738853888").then(banner => {
    console.log(banner)
    console.timeEnd("first_time")

    console.time("cache")
    GetUserBanner("269870630738853888").then(banner_two => {
        console.log(banner_two)
        console.timeEnd("cache")
    });

    setTimeout(() => {
        console.time("recache")
        GetUserBanner("269870630738853888").then(banner_three => {
            console.log(banner_three)
            console.timeEnd("recache")
        });
    }, 1.2*60*1000)
});

client.login(process.env.TOKEN)