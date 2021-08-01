const fetch = require("node-fetch");
const Cacher = require("../Vars/Cacher")
const banner_url = require("../Vars/BannerURL");
const { reCache, CacheBanner } = require("./CacheBanner");

/**
 * 
 * @param {string} userId 
 * @param {{
 * token?: string
 * }} options 
 * @description
 * Returns the user banner url, or the color.
 * @deprecated
 * Will be removed in the near future.
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

    if(Cacher.get(userId) && !reCache(userId))
    {
        let data = (Cacher.get(userId));
        if(data.bannerUrl)
            return data.bannerUrl;
        return data
    }

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

    const isColor = jsonData["banner_color"];

    if(!banner && !isColor)
    {
        CacheBanner(userId, null);
        return Promise.resolve(null);
    }
    else if (isColor && !banner)
    {
        CacheBanner(userId, isColor);
        return Promise.resolve(isColor);
    }
    else if (!isColor && banner)
    {
        CacheBanner(userId, banner);
        return Promise.resolve(banner);
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
    return Promise.resolve(`${banner_url(userId)}${banner}.gif?size=1024`);
}

/**
 * 
 * @param {string} userId The user id
 * @param {{
 * token?: string,
 * size?: 1024,
 * format?: "png" | "jpg" | "gif"
 * }} options 
 * @returns Promise<{ banner: string | null, banner_color | null: string, banner_url: string | null }>
 */
async function getUserBanner(userId, options = {
    token: Cacher.get("token"),
    size: 1024,
    format: "gif"
})
{
    if(!userId)
        throw new Error(`Please ensure there's a userId`);
    
    let token = options.token;

    if(!token)
        throw new Error(`Please make sure you have a valid token.`);

    if(!options.format)
        options.format = "png";

    if(!options.size)
        options.size = 1024;

    if(Cacher.get(userId) && !reCache(userId))
        return (Cacher.get(userId)).data;

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

    const isColor = jsonData["banner_color"];

    let data = {
        banner: banner,
        banner_color: isColor,
    }

    if(options.format === "gif")
    {
        const isGif = await fetch(`${banner_url(userId)}${banner}.gif`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`
            }
        });

        if(isGif.status === 415)
        {
            data["banner_url"] = `${banner_url(userId)}${banner}.png?size=${options.size}`;
        }
    
        data["banner_url"] = `${banner_url(userId)}${banner}.gif?size=${options.size}`;
    }

    if(options.format === "jpg")
    {
        data["banner_url"] = `${banner_url(userId)}${banner}.jpg?size=${options.size}`;
    }

    if(options.format === "png")
    {
        data["banner_url"] = `${banner_url(userId)}${banner}.png?size=${options.size}`;
    }

    CacheBanner(userId, data);
    return Promise.resolve(data);
}

module.exports.GetUserBanner = GetUserBanner;
module.exports.getUserBanner = getUserBanner;