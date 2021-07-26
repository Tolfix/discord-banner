const { Structures } = require("discord.js");
const Cacher = require("./Vars/Cacher");

/**
 * 
 * @param {string} token 
 * @param {{
 * cacheTime: 15*60*1000
 * }} options 
 */
module.exports = (token, options = {}) =>
{
    if(token)
        Cacher.set("token", token);

    if(options.cacheTime && typeof options.cacheTime === "number")
        Cacher.set("cache_time", options.cacheTime);

    Structures.extend("User", () => require("./ExtendedUser"));
}

module.exports.ExtendedUser = require("./ExtendedUser");
module.exports.GetUserBanner = require("./Functions/GetUserBanner");
module.exports.Cacher = require("./Vars/Cacher");
module.exports.banner_url = require("./Vars/BannerURL");
module.exports.reCache = require("./Functions/CacheBanner").reCache;
module.exports.CacheBanner = require("./Functions/CacheBanner").CacheBanner;
