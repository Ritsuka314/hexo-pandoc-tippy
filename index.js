'use strict';

// put js & css assets into ./public
const fs = require('hexo-fs');

let config = hexo.config.tippy;

let assets = [];

const format = require('util').format;
let theme_name = config ? config.theme_name : '';
theme_name = theme_name ? theme_name : '';

// generate js script
assets.push({
    path: 'js/attachTooltips.js',
    data: format(
        fs.readFileSync(__dirname+'/attachTooltips.js'),
        theme_name
    )
});

// generate css
if (config instanceof Object && typeof config.theme_file !== 'undefined')
    assets.push({
        path: 'css/tippy.css',
        data: function(){
            return fs.createReadStream(config.theme_file);
        }});

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
