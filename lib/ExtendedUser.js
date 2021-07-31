const { User } = require("discord.js")
const fetch = require("node-fetch");
const Cacher = require("./Vars/Cacher")
const banner_url = require("./Vars/BannerURL");
const { reCache, CacheBanner } = require("./Functions/CacheBanner");

class ExtendedUser extends User
{

    constructor(client, data)
    {
        super(client, data);
        this.token = client.token;
    }

    /**
     * 
     * @param {String} userId 
     * @returns Promise<String|null>
     * @description Gives the banner from the user id.
     * @deprecated Will be removed, use bannerURL()
     */
    async getUserBanner(userId = this.id)
    {
        this.bannerURL(userId);
    }
    /**
     * 
     * @param {String} userId 
     * @returns Promise<string|null>
     * @description Gives the banner from the user id.
     */
    async bannerURL(userId = this.id)
    {    
        let token = this.token;

        if(!token)
            throw new Error(`Please make sure you have a valid token.`);

        if(Cacher.get(userId) && !reCache(userId))
            return (Cacher.get(userId)).data.banner_url;

        // let response = await fetch(`https://discord.com/api/v8/users/${userId}`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bot ${token}`
        //     }
        // });

        // const status = response.status;

        // if(status === 404)
        //     throw new Error(`Unable to find a user with id ${userId}`);

        const jsonData = await (this.client.api.users(userId).get());
        console.log(jsonData)

        const banner = jsonData["banner"];

        if(!banner)
        {
            CacheBanner(userId, null);
            return Promise.resolve(null);
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
}

module.exports = ExtendedUser;