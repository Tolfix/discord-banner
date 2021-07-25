const fetch = require("node-fetch");
const CacheGeneral = require("../Vars/GeneralCache");
const Cacher = require("../Vars/Cacher")
const banner_url = require("../Vars/BannerURL");
const { reCache, CacheBanner } = require("./CacheBanner");

/**
 * 
 * @param {string} userId 
 * @param {{
 * token?: string
 * }} options 
 */
async function GetUserBanner(userId, options = {
    token: CacheGeneral.get("token")
})
{
    if(!userId)
        throw new Error(`Please ensure there's a userId`);
    
    let token = options.token;

    if(!token)
        throw new Error(`Please make sure you have a valid token.`);

    if(Cacher.get(userId) && !reCache(userId))
        return (Cacher.get(userId)).bannerUrl;

    let response = await fetch(`https://discord.com/api/v8/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${token}`
        }
    });

    const status = response.status;

    if(status === 404)
        throw new Error(`Unable to find a user with id ${userId}`);

    const jsonData = await response.json();

    const banner = jsonData["banner"];

    const isColor = jsonData["accent_color"];

    if(!banner && !isColor)
    {
        CacheBanner(userId, null);
        return Promise.resolve(null);
    }
    else if (isColor)
    {
        CacheBanner(userId, isColor);
        return Promise.resolve(isColor);
    }

    const isGif = await fetch(`${banner_url(userId)}${banner}.gif`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${token}`
        }
    });

    if(isGif.status === 415)
    {
        CacheBanner(userId, `${banner_url(userId)}${banner}.png?size=1024`);
        return Promise.resolve(`${banner_url(userId)}${banner}.png?size=1024`);
    }
    
    CacheBanner(userId, `${banner_url(userId)}${banner}.gif?size=1024`);
    return Promise.resolve(`${banner_url(userId)}/${banner}.gif?size=1024`);
}

module.exports = GetUserBanner;