/// <reference types="node" />

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

declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PUBLIC_URL: string;
      ENETO_DB_LIMIT: string;
      ENETO_DB_HOST: string;
      ENETO_DB_USER: string;
      ENETO_DB_PASSWORD: string;
      ENETO_DB_DATABASE: string;
      ENETO_PORT: string;
      HTTPS: string;
    }
  }
