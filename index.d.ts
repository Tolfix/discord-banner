declare module "discord.js" {
    export class ClientUser {
        getUserBanner(clientId?: string): Promise<String|Null>
    }
}