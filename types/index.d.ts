import { Client, User } from "discord.js";

declare module "discord.js" {
    export interface ClientUser
    {
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the user id.
         */
        getUserBanner(clientId?: string): Promise<string|null>
    }

    export interface User
    {
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the user id.
         */
        getUserBanner(clientId?: string): Promise<string|null>
    }
}

export class ExtendedUser extends User
{
    getUserBanner(clientId?: string): Promise<string|null>
}

export function GetUserBanner(clientId: string, options: {token:string}): Promise<string|null>

declare module "discord-banner"
{
    export default function (client: Client): void
}