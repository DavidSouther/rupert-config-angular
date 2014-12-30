var Path = require('path');

var TW = require(Path.join(
    __dirname,
    '../../rupert/node_modules/stassets/lib/Watchers/Template'
));
TW.prototype.getModuleName = function(shortPath){
    var module = shortPath.replace(/\//g, '.') + '.template';
    if (moduleRoot = this.config.templates.baseModule){
        module = "" + moduleRoot + "." + module;
    }
    return module;
};

TW.prototype.cache = function(path){
    var shortPath = this.getShortPath(path);
    console.log('Caching');

    var module = this.getModuleName(shortPath);

    var pre =[
        "angular.module(", "'", module, "'", ", ", "[]", ")",
        ".run(function($templateCache){",
        "$templateCache.put(", "'", shortPath, "'", ",", " '"
    ];
    var post = [
        "');", "});"
    ];

    return {pre: pre, post: post};
};

module.exports = function (config){
    config.scripts = { types: [
        'main', 'provider', 'filter', 'service', 'controller', 'directive'
    ]};

    config.vendors = config.vendors || {};
    config.vendors.prefix = config.vendors.prefix || [];
    config.vendors.prefix.push(Path.resolve(__dirname, '../node_modules'));

    config.vendors.js = [
        'angular-builds/angular.min.js',
        'angular-builds/angular-cookies.min.js',
        'angular-builds/angular-resource.min.js',
        'angular-builds/angular-sanitize.min.js',
        'angular-builds/angular-animate.min.js',
        'angular-builds/angular-touch.min.js',
        'angular-builds/angular-messages.min.js',
        'angular-builds/angular-aria.min.js',
        'angular-ui-router/release/angular-ui-router.js',
    ].concat(config.vendors.js || []);

    return config;
};
