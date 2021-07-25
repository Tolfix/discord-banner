const Cacher = require("../Vars/Cacher");
const GeneralCache = require("../Vars/GeneralCache");

module.exports =  {
    CacheBanner: (userId, bannerUrl) => {
        Cacher.set(userId, {
            bannerUrl,
            cachedAt: new Date()
        });
    },

    reCache: (userId) => {
        const TIME = GeneralCache.get("cache_time") ? GeneralCache.get("cache_time") : 15*60*1000;
        const cache = Cacher.get(userId);
        if(new Date() - cache.cachedAt > TIME)
            return true;

        return false;
    }
}