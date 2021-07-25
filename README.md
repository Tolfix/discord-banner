<p align="center">
  <img width="260" src="https://cdn.tolfix.com/images/TX-Small.png">
  <br/>
  NPM PACKAGE | discord-banner
</p>

# Discord-Banner
![](https://nodei.co/npm/discord-banner.svg)

Gives possibilities to get a users banner from discord.

# Installing
``npm install discord-banner``

# Examples

With discord.js
```js
// initializes the package.
// Has to go before client!
require("discord-banner")();

// Creating a new client.
const client = new (require("discord.js").Client);

client.on("message", async (message) => {
    // Get the banner url.
    console.log(await message.author.bannerURL())
});
```

Stand alone
```js
/**
 * Option 1
 * Include the token in the function
 */
const { GetUserBanner } = require("discord-banner");

GetUserBanner("a client id", {
  token: "super secret token",
}).then(banner => console.log(banner));

/**
 * Option 2
 * Include the token in discord-banner and cache
 */
require("discord-banner")("super secret token")
const { GetUserBanner } = require("discord-banner");

GetUserBanner("a client id").then(banner => console.log(banner));
```

# Discord
[![Discord](https://discord.com/api/guilds/833438897484595230/widget.png?style=banner4)](https://discord.gg/xHde7g93Yh)