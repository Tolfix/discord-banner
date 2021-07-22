<p align="center">
  <img width="260" src="https://cdn.tolfix.com/images/TX-Small.png">
  <br/>
  Discord-Banner
</p>

# Discord-Banner
Gives possibilities to get an discord's user banner.

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
const { GetUserBanner } = require("discord-banner");

GetUserBanner("a client id", {
  token: "super secret token",
}).then(banner => console.log(banner));
```

# Discord
[![Discord](https://discord.com/api/guilds/833438897484595230/widget.png?style=banner4)](https://discord.gg/xHde7g93Yh)