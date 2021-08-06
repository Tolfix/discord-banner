require("dotenv").config();
// Creating a new client.
require("../lib/index")(process.env.TOKEN);
const client = new (require("discord.js").Client);
// initializes the package.
// const { ExtendedUser, getUserBanner } = require("../lib/index")

client.on("message", async (message) => {
    if(message.author.bot) return;
    message.channel.send(await message.author.bannerURL({ format: "gif"}));
    console.log(await message.author.banner)
    // if(message.author.id === "269870630738853888")
    //     return console.log(message.mentions.users.first() ? await message.mentions.users.first().bannerURL() : await message.author.bannerURL())
});

// console.time("first_time");
// getUserBanner("269870630738853888").then(banner => {
//     console.log(banner)
//     console.timeEnd("first_time")

//     console.time("cache")
//     getUserBanner("269870630738853888").then(banner_two => {
//         console.log(banner_two)
//         console.timeEnd("cache")
//     });

//     setTimeout(() => {
//         console.time("recache")
//         getUserBanner("269870630738853888").then(banner_three => {
//             console.log(banner_three)
//             console.timeEnd("recache")
//         });
//     }, 1.2*60*1000)
// });

// getUserBanner("754482040178737343", {
//     token: process.env.TOKEN,
//     format: "png"
// }).then((banner) => {
//     console.log(banner.url)
// })

client.login(process.env.TOKEN)