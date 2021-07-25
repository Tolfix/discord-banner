const { Structures } = require("discord.js");
const Cacher = require("./Vars/Cacher");

module.exports = (token) =>
{
    if(token)
        Cacher.set("token", token);

    Structures.extend("User", () => require("./ExtendedUser"));
}

module.exports.ExtendedUser = require("./ExtendedUser");
module.exports.GetUserBanner = require("./Functions/GetUserBanner");
module.exports.Cacher = require("./Vars/Cacher");