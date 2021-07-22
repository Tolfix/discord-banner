const { Client, Structures } = require("discord.js")

module.exports = () =>
{
    Structures.extend("User", () => require("./ExtendedUser"))
}

module.exports.ExtendedUser = require("./ExtendedUser");
module.exports.GetUserBanner = require("./Functions/GetUserBanner");