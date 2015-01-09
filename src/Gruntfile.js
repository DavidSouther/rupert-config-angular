Path = require('path');

module.exports = function(grunt, config){
  config.prepend('client.test.tools', [
    'angular-mocks/angular-mocks.js',
    'mockasing/src/tools/*'
  ].map(function(_){
    return Path.join(__dirname, "../node_modules/", _);
  }));
};
