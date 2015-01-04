var Path = require('path');

var cts = require('rupert').Stassets.constructors;

var TW = cts.Template;
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
TW.prototype.concat = cts.SourceMap.prototype.concat; // Skip the globals.

module.exports = function (config){
    config.prepend('stassets.scripts.types', [
        'main', 'provider', 'filter', 'service', 'controller', 'directive'
    ]);

    var nm = Path.resolve(__dirname, '../node_modules');
    config.append('stassets.vendors.prefix', nm);

    config.prepend('stassets.vendors.js', [
        'angular-builds/angular.min.js',
        'angular-builds/angular-cookies.min.js',
        'angular-builds/angular-resource.min.js',
        'angular-builds/angular-sanitize.min.js',
        'angular-builds/angular-animate.min.js',
        'angular-builds/angular-touch.min.js',
        'angular-builds/angular-messages.min.js',
        'angular-builds/angular-aria.min.js',
        'angular-ui-router/release/angular-ui-router.js',
    ]);
};
