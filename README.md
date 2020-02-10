# hexo-pandoc-tippy

A hexo plugin to add tooltips to your blog posts using [tippy](https://atomiks.github.io/tippyjs/).

This plugin differs from other similar ones by
allowing full [pandoc footnote definition](http://pandoc.org/MANUAL.html#footnotes),
e.g.,

* allowing footnote identifiers other than just numbers (e.g., [^footnote])
* allowing  rich text in footnote

This edition works with hexo-renderer-pandoc. Another edition named hexo-markdown-it-tippy works with hexo-renderer-markdown-it-plus.

## Getting Started

### Prerequisites

Current version (0.4.4) works with the following packages.
Newer/older versions may be compatible, but there is no test to guarantee that.
* [tippy.js](https://atomiks.github.io/tippyjs/): 2.0.2
* [hexo-fs](https://github.com/hexojs/hexo-fs): 0.2.2
* [lodash](https://lodash.com/): 4.17.4

If you installed this package as described in [Getting Started](#Getting Started),
npm should have automaticlly installed the above packages for you.

Further more, this plugin also requires:
* [hexo](https://hexo.io/): 3.4.3
* [hexo-renderer-pandoc](https://github.com/wzpan/hexo-renderer-pandoc): 0.3.0 (versions below 0.3.0 do not support Hexo Tags well)
* [pandoc](https://pandoc.org/): 2.9.11
* [python](https://www.python.org/): I use 3.6.2, but 2.7 may also work.
* [Panflute](http://scorreia.com/software/panflute/index.html#): 1.10.6

You have to install the above yourself.

Note: Pandoc 2.5.0 is known to cause problem^[https://github.com/RichardYan314/hexo-pandoc-tippy/issues/5#issuecomment-576097155]. 

### Installing

Assuming you have the required tools, otherwise see 

* [hexo installation](https://hexo.io/docs/#Installation)
* [pandoc installation](https://pandoc.org/installing.html)
* [python installation](https://www.python.org/downloads/)
* [panflute installation](http://scorreia.com/software/panflute/install.html)

Execute under root directory of your hexo blog:
```
npm install hexo-pandoc-tippy --save
```

Add to your `./_config.yml` file:
``` yml
pandoc:
  # other options
  filters:
    - node_modules/hexo-pandoc-tippy/pandocFilter.py
  extra:
    - toc:
```

### Customization

Options to tippy can be specified in `./_config.yml` as:

```
tippy:
  ...
```

A full list of all possible options can be found at [here](https://atomiks.github.io/tippyjs/all-options)

Theming is also possible:

```
tippy:
  theme_file: tippy-theme.css   # css file containing the theme, relative to blog root directory
  theme_name: honeybee          # theme name, see tippy docs
```

Where `theme_name` is aliased to `theme` in the tippy options list.
See tippy's instruction on [creating themes](https://atomiks.github.io/tippyjs/#themes)

Notice that all relative paths are relative to hexo root, not blog root (`./source`).

The above steps only need to be done once.
After that,
run `hexo` to generate your blog and see the tooltips in effect.

## Footnotes in Hexo Tags ##

Here we are referring to [this sort of tags](https://hexo.io/docs/tag-plugins), not [post tags](https://hexo.io/docs/front-matter#Categories-amp-Tags)

Due to how tags are rendered, content of each tag has its own "scope". When rendering a tag, Pandoc sees neither other tags contained in it, nor the context where it is contained. One implication of which is when using footnotes, one has to be aware of that a footnote reference and its definition has to be in the same tag. Even when one thing is in the tag nested in where the other is, is illegal.

For example, the following is illegal.

```
{% tag %}
[^1]
{% tag %}
[^1]: definition of footnote 1
{% endtag%}
{% endtag%}
```

The following is illegal, as all three definitions are in different scopes.

```
{% tag %}
[^1]
{% tag %}
[^1]
[^1]: definition of footnote 1
{% endtag%}
[^1]: definition of footnote 1
{% endtag%}

{% tag %}
[^1]
[^1]: definition of footnote 1
{% endtag%}
```


## Why Python Filter?
Firstly, as hexo uses node.js, any user uses hexo must already have node.js installed. Thus I agree js is the most approperate language to use.

However, as the [node.js interface](https://github.com/mvhenderson/pandoc-filter-node) does not provide method to append to the AST, which this plugin must require, it is not yet possible to write the filter in js.

Therefore, I had to look elsewhere. And I found that panflute can be called as:

``` python
run_filter(action, prepare=prepare, finalize=finalize, doc=doc)
```

which is easy to use.

Also it is safer to assume that more users already have Python installed than have Haskell installed. If this assumption is not true, I think installing Python is much easier. (Truth being told, believeing me being the only user, I will just make myself convient)

## Contributing

This project starts off as a personal tool for my own blog,
and thus is written with no consideration of any other user.
Despite being functioning, the project is still very incomplete.

Also yet being a personal project, I would very happy if someone is interesting in
using, or even improving it. Thus issue/pull request are greatly welcomed.

However, please bear in mind that, being yet a personal project,
this plugin may not be stable during use, and I may not be able
to accept pull requests, whether due to personal energy or taste.

## Versioning

The project is first published under the version 0.1.0.
As improvements being made, I will keep incrementing the MINOR and PATCH verion,
depending on the actual changes.

I will not increment the MAJOR version to `1` until the project
becomes satisfactory and ready to face massive users.

## Authors

* [**Richard Yan**](https://github.com/RichardYan314)

## License

This project is licensed under the
GNU General Public License v3.0
license.

See the [LICENSE.md](LICENSE.md) file for the full text.

## Acknowledgments

* HEXO
* pandoc
