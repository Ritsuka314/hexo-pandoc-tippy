'use strict';

// put js & css assets into ./public
const fs = require('hexo-fs');
const format = require('util').format;
let config = hexo.config.tippy;

let assets = [];

// generate css
if (config instanceof Object && typeof config.theme_file !== 'undefined') {
    var theme_file = config.theme_file;
    assets.push({
        path: 'css/tippy.css',
        data: function(){
            return fs.createReadStream(theme_file);
        }});
}

delete config.theme_file;

// default parameters
let dflt = {
arrow: true,
animation: 'fade',
distance: 15,
arrowTransform: 'scale(2)',
placement: 'top-start'}

// merge default to user config
for (var key in dflt) {
  if (!(key in config))
    config[key] = dflt[key];
}

// for backward compatibility
// when 'theme_name' is defined
if (!('theme' in config))
  config['theme'] = config['theme_name'];

// generate js script
assets.push({
    path: 'js/attachTooltips.js',
    data: format(
        fs.readFileSync(__dirname+'/attachTooltips.js'),
        JSON.stringify(config)
    )
});

// generate js & css
hexo.extend.generator.register('tippy', function(){ return assets; });

// Add js/css resources to each post
hexo.extend.filter.register('after_post_render', function(data) {
    data.content =
        "<script src='https://unpkg.com/tippy.js@2.0.2/dist/tippy.all.min.js'></script>\n" +
        "<script src='/js/attachTooltips.js'></script>\n" +
        "<link rel='stylesheet' href='/css/tippy.css'>\n" +
        data.content;

    return data;
});
