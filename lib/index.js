const { Client, Structures } = require("discord.js")

/**
 * @param {Client} client 
 */
module.exports = (client) =>
{
    if (!client || !client instanceof Client) 
        throw new Error("Please provide the discord.js client");

    Structures.extend("User", () => require("./ExtendedUser"))
}

module.exports.ExtendedUser = require("./ExtendedUser");
module.exports.GetUserBanner = require("./Functions/GetUserBanner");