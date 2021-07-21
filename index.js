
const { Client, Structures } = require("discord.js")
const ExtendedUser = require("./ExtendedUser");

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) =>
{
    if (!client || !client instanceof Client) 
        throw new Error("Please provide the discord.js client");

    Structures.extend("User", () => ExtendedUser)
}