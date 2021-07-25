const fetch = require("node-fetch");
const Cacher = require("../Vars/Cacher");

/**
 * 
 * @param {string} userId 
 * @param {{
 * token?: string
 * }} options 
 */
async function GetUserBanner(userId, options = {
    token: Cacher.get("token")
})
{
    if(!userId)
        throw new Error(`Please ensure there's a userId`);
    
    let token = options.token;

    if(!token)
        throw new Error(`Please make sure you have a valid token.`);

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
        return Promise.resolve(null);
    else if (isColor)
        return Promise.resolve(isColor);

    const isGif = await fetch(`https://cdn.discordapp.com/banners/${userId}/${banner}.gif`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${token}`
        }
    });

    if(isGif.status === 415)
        return Promise.resolve(`https://cdn.discordapp.com/banners/${userId}/${banner}.png?size=1024`)

    return Promise.resolve(`https://cdn.discordapp.com/banners/${userId}/${banner}.gif?size=1024`)
    
}

module.exports = GetUserBanner;