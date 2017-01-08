var metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var metadata = require('metalsmith-metadata');

var siteBuild = metalsmith(__dirname)
  .metadata({
    title: 'MunichJS'
  })
  .source('./contents')
  .destination('./build')
  .use(markdown())
  .use(metadata({
    events: 'events.yaml'
  }))
  .use(layouts({
    engine: 'pug'
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });