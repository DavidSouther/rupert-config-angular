Path = require('path')
server =
  name: 'rupert-config-angular.test'
  root: __dirname
  plugins:
    dependencies: {}
  stassets:
    root: './'
    vendors:
      prefix: ['.']
      js: ['extra.js']
    angular:
      useJquery: true

server.plugins.dependencies[Path.resolve(__dirname, '../src/config')] = yes

rupert = require('rupert')(server)
config = rupert.config

describe 'Rupert Config Angular w/ jQuery', ->
  it 'attaches jquery to the config', ->
    config.stassets.vendors.js.length.should.equal 11

  it 'loads jquery first', ->
    config.stassets.vendors.js[0].should.match /jquery\.min\.js/
