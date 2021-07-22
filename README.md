<p align="center">
  <img width="260" src="https://cdn.tolfix.com/images/TX-Small.png">
  <br/>
  Discord-Banner
</p>

# Discord-Banner
Gives possibilities to get an discord's user banner.

# Examples
```js
// Creating a new client.
const client = new (require("discord.js").Client);
// initializes the package.
require("discord-banner")(client);

client.on("message", async (message) => {
    // Possible to get it from the client.
    console.log(await client.user.getUserBanner("269870630738853888"))
});
```

# Discord
[![Discord](https://discord.com/api/guilds/833438897484595230/widget.png?style=banner4)](https://discord.gg/xHde7g93Yh)