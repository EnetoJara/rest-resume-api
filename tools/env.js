'use strict';

const fs = require('fs');
const path = require('path');

require('dotenv-expand')(
    require('dotenv').config({ path: path.join(__dirname, "../.env") }));

const privateKey = fs.readFileSync(path.join(__dirname, "../private.key"), "utf8");
const publicKEY = fs.readFileSync(path.join(__dirname, "../public.key"), "utf8");


const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(appDirectory, folder))
    .join(path.delimiter);

const ENETO = /^ENETO_/i;

function setVariables (publicUrl = "/") {
    const raw = Object.keys(process.env)
        .filter(key => ENETO.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                NODE_ENV: process.env.NODE_ENV || 'development',
                PUBLIC_URL: publicUrl,
                PRIVATE_KEY: privateKey,
                PUBLIC_KEY: publicKEY
            }
        );

        const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {}),
    };
console.log('stringified: ', stringified);
    return { raw, stringified };
}

module.exports = setVariables;
