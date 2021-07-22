const { User } = require("discord.js")
const fetch = require("node-fetch");

class ExtendedUser extends User
{

    constructor(client, data)
    {
        super(client, data);
        this.token = client.token;
    }

    /**
     * 
     * @param {String} clientId 
     * @returns Promise<String|null>
     * @description Gives the banner from the client id.
     */
    async getUserBanner(clientId = this.id)
    {
        let token = this.token;
        if(!token)
            throw new Error(`Please make sure you initialize the client`);

        let response = await fetch(`https://discord.com/api/v8/users/${clientId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`
            }
        })

        const status = response.status;
        if(status === 404)
            return Promise.resolve(null);

        const jsonData = await response.json();

        const banner = jsonData["banner"];

        const isColor = jsonData["accent_color"];

        if(!banner && !isColor)
            return Promise.resolve(null);
        else if (isColor)
            return Promise.resolve(isColor);

        const isGif = await fetch(`https://cdn.discordapp.com/banners/${clientId}/${banner}.gif`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${token}`
            }
        })

        if(isGif.status === 415)
            return Promise.resolve(`https://cdn.discordapp.com/banners/${clientId}/${banner}.png?size=1024`)

        return Promise.resolve(`https://cdn.discordapp.com/banners/${clientId}/${banner}.gif?size=1024`)
    }
}

module.exports = ExtendedUser;