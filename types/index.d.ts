import { User } from "discord.js";

declare module "discord.js" {
    export interface ClientUser
    {
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the user id.
         * @deprecated
         */
        getUserBanner(clientId?: string): Promise<string|null>
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the user id.
         */
        bannerURL(clientId?: string): Promise<string|null>
    }

    export interface User
    {
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the user id.
         * @deprecated
         */
        getUserBanner(clientId?: string): Promise<string|null>
        /**
         * 
         * @param {String} clientId 
         * @returns Promise<String|null>
         * @description Gives the banner from the user id.
         */
        bannerURL(clientId?: string): Promise<string|null>
    }
}

export class ExtendedUser extends User
{
    /**
     * 
     * @param clientId 
     * @deprecated
     */
    getUserBanner(clientId?: string): Promise<string|null>

    /**
     * 
     * @param {String} userId 
     * @returns Promise<string|null>
     * @description Gives the banner from the user id.
     */
    async bannerURL(userId = this.id): Promise<null | string>
}

/**
 * 
 * @param clientId 
 * @param options 
 * @deprecated
 */
export function GetUserBanner(clientId: string, options: {token:string}): Promise<string|null>

/**
 * 
 * @param {string} userId The user id
 * @param {{
 * token?: string
 * }} options 
 * @returns Promise<{ banner: string | null, banner_color | null: string, banner_url: string | null }>
 */
export function getUserBanner(clientId: string, options: { token: string }): Promise<{ banner: string | null, banner_color: string | null, banner_url: string | null }>

export interface ICacher
{
    [clientId: string]: {
        bannerUrl: string,
        cachedAt: Date
    } | {
        token: string;
        cache_time: number;
    };
} 

export const Cacher = new Map<keyof ICacher, ICacher[keyof ICacher]>();

export function banner_url<user extends string>(userId: user): `https://cdn.discordapp.com/banners/${user}/`;

export function reCache(userId: string): Boolean;

export function CacheBanner(userId: string, bannerUrl: string): void;

declare module "discord-banner"
{
    export default function (token?: string, options?: {
        cacheTime: number;
    }): void
}