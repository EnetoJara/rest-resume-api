"use strict";

module.exports = function (api) {
    const {NODE_ENV="development"} = process.env;

    api.cache(() => NODE_ENV);
    api.env();
    return {
        presets: [
            "@babel/preset-typescript"
        ],
        plugins: [
            ["@babel/plugin-transform-runtime", { "corejs": {
                "version": 3,
                "proposals": true,
            },

            "useESModules": false
         }],
            "@babel/plugin-transform-modules-commonjs"
        ]
    }
}
