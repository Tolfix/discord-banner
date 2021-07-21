import { Client } from "discord.js";

declare module "discord.js" {
    export interface ClientUser
    {
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the client id.
         */
        getUserBanner(clientId?: string): Promise<String|null>
    }

    export interface User
    {
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the client id.
         */
        getUserBanner(clientId?: string): Promise<String|null>
    }
}

declare module "discord-banner"
{
    export default function (client: Client): void
}