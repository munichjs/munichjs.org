#!/usr/bin/env node

'use strict';

var devBuild = ((process.env.NODE_ENV || '').trim().toLowerCase()) !== 'production';
var pkg = require('./package.json');

console.log((devBuild ? 'Development' : 'Production'), 'build, version', pkg.version);

var metalsmith  = require('metalsmith');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var metadata    = require('metalsmith-metadata');
var assets      = require('metalsmith-assets');
var browsersync = devBuild ? require('metalsmith-browser-sync') : null;

var pageMeta = {
  title   : 'MunichJS',
  version : pkg.version,
  domain  : devBuild ? 'http://127.0.0.1' : 'https://munichjs.org',
};

var ms = metalsmith(__dirname)
  .clean(true)
  .metadata(pageMeta)
  .source('./contents')
  .destination('./build')
  .use(markdown())
  .use(metadata({
    events  : 'events.json'
  }))
  .use(layouts({
    engine  : 'pug'
  }))
  .use(assets({
    source  : './assets'
  }));

if(devBuild) ms
  .use(browsersync({
    server  : './build',
    files   : [
      './contents/**/*.md',
      './layouts/**/*.pug',
      './assets/**/*.css'
    ]
  }))

ms.build(function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Site build complete!');
  }
});