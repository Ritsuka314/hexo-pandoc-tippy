'use strict';

// put js & css assets into ./public
const fs = require('hexo-fs');
const format = require('util').format;
let config = hexo.config.tippy;

if (!(config instanceof Object))
    config = {}

let assets = [];

// generate css
if (typeof config.theme_file !== 'undefined') {
    var theme_file = config.theme_file;
    assets.push({
        path: 'css/tippy.css',
        data: function(){
            return fs.createReadStream(theme_file);
        }});

    delete config.theme_file;
}

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

// fix footnote references
hexo.extend.filter.register("after_post_render", function(doc){
  const { extname } = require('path');
  if ((doc.source ? extname(doc.source) : '') in ['md', 'markdown', 'mkd', 'mkdn', 'mdwn', 'mdtxt','mdtext']) {
    const fixFootnotes = require("./fixFootnotes.js");
    fixFootnotes(doc);
  }
  return doc;
})