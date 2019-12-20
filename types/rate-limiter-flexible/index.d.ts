
declare module "rate-limiter-flexible" {

    interface Opts {
        storeClient: any;
        keyPrefix: string;
        points: number;
        duration: number;
        blockDuration: number;
    }

    class RateLimiterRedis {
        public constructor (opts: Opts);

        public get(ip: string): Promise<any>;

        public consume (ip: string): Promise<any>;

        public delete (ip: string): Promise<void>;
    }
}
