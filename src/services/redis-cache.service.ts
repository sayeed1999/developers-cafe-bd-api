import { createClient, RedisClientType } from 'redis';

export default class RedisCacheService {
    
    private readonly _client: RedisClientType;

    constructor(client: RedisClientType) {
        this._client = client;
    }

    set = async (key: string, value: any) => {
        return await this._client.SET(key, value);
    }

    get = async (key: string) => {
        return await this._client.GET(key);
    }

    setHashMap = async (key: string, object: Object) => {
        let params = ['HSET', key];
        Object.keys(object).forEach(k => {
            params.push(k);
            params.push(object[k]);
        });
        return await this._client.sendCommand(params);
    }

    getHashMap = async (key: string) => {
        return await this._client.HGETALL(key);
    }

    insertIntoList = async (key: string, object: Object) => {
        return await this._client.LPUSH(key, JSON.stringify(object));
    }

    getFromList = async (key: string) => {
        let res = await this._client.LRANGE(key, 0, 10000);
        let parsedRes = res.map(item => JSON.parse(item));
        return parsedRes;
    }

}
