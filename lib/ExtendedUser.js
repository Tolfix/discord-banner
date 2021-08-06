const { User } = require("discord.js")
const fetch = require("node-fetch");
const Cacher = require("./Vars/Cacher")
const banner_url = require("./Vars/BannerURL");
const { reCache, CacheBanner } = require("./Functions/CacheBanner");

Object.defineProperty(User.prototype, "bannerURL", {
    /**
     * 
     * @param {{
     * size?: 1024,
     * format?: "png" | "jpg" | "gif"
     * }} options 
     * @returns Promise<string|null>
     * @description Gives the banner from the user id.
     */
    value: async function(options = {
        size: 1024,
        format: "png",
    })
    {
        let userId = this.id;

        if (userId === "")
            userId = this.id;

        if (!options.format)
            options.format = "png";

        if (!options.size)
            options.size = 1024;


        if (Cacher.get(userId) && !reCache(userId))
            return (Cacher.get(userId)).data.url;

        const jsonData = await (this.client.api.users(userId).get());

        const banner = jsonData["banner"];

        let data = {
            color: null,
            hash: null,
        };

        if (banner)
        {

            if (options.format === "gif")
            {
                const isGif = await fetch(`${banner_url(userId)}${banner}.gif`, {
                    method: 'GET',
                });

                if (isGif.status === 415) {
                    data["url"] = `${banner_url(userId)}${banner}.png?size=${options.size}`;
                } else
                    data["url"] = `${banner_url(userId)}${banner}.gif?size=${options.size}`;

            }

            if (options.format === "jpg")
            {
                data["url"] = `${banner_url(userId)}${banner}.jpg?size=${options.size}`;
            }

            if (options.format === "png")
            {
                data["url"] = `${banner_url(userId)}${banner}.png?size=${options.size}`;
            }
        }

        if (!banner)
            data["url"] = null;

        CacheBanner(userId, data);
        return Promise.resolve(data.url);
    },
})

/*
class ExtendedUser extends User {

    constructor(client, data) {
        super(client, data);
        this.token = client.token;
    }

    /**
     * 
     * @param {{
     * size?: 1024,
     * format?: "png" | "jpg" | "gif"
     * }} options 
     * @returns Promise<string|null>
     * @description Gives the banner from the user id.
     
    async bannerURL(options = {
        size: 1024,
        format: "png",
    }) {
        let token = this.token;
        let userId = this.id;

        if (!token)
            throw new Error(`Please make sure you have a valid token.`);

        if (userId === "")
            userId = this.id;

        if (!options.format)
            options.format = "png";

        if (!options.size)
            options.size = 1024;


        if (Cacher.get(userId) && !reCache(userId))
            return (Cacher.get(userId)).data.url;


        const jsonData = await (this.client.api.users(userId).get());

        const banner = jsonData["banner"];

        let data = {
            color: null,
            hash: null,
        };

        if (banner)
        {

            if (options.format === "gif")
            {
                const isGif = await fetch(`${banner_url(userId)}${banner}.gif`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bot ${token}`
                    }
                });

                if (isGif.status === 415) {
                    data["url"] = `${banner_url(userId)}${banner}.png?size=${options.size}`;
                } else
                    data["url"] = `${banner_url(userId)}${banner}.gif?size=${options.size}`;

            }

            if (options.format === "jpg")
            {
                data["url"] = `${banner_url(userId)}${banner}.jpg?size=${options.size}`;
            }

            if (options.format === "png")
            {
                data["url"] = `${banner_url(userId)}${banner}.png?size=${options.size}`;
            }
        }

        if (!banner)
            data["url"] = null;

        CacheBanner(userId, data);
        return Promise.resolve(data.url);
    }
}
module.exports = ExtendedUser;
*/