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
     * @param {{
     * size?: 1024,
     * format?: "png" | "jpg" | "gif"
     * }} options 
     * @returns Promise<string|null>
     * @description Gives the banner from the user id.
     */
    async bannerURL(userId = this.id, options = {
        size: 1024,
        format: "png",
    })
    {    
        let token = this.token;

        if(!token)
            throw new Error(`Please make sure you have a valid token.`);

        if(userId === "")
            userId = this.id;
        
        if(!options.format)
            options.format = "png";

        if(!options.size)
            options.size = 1024;


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

        const banner = jsonData["banner"];

        if(!banner)
        {
            CacheBanner(userId, null);
            return Promise.resolve(null);
        }

        let data = {
            banner: "",
            banner_color: ""
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
        return Promise.resolve(data.banner_url);
    }
}

module.exports = ExtendedUser;