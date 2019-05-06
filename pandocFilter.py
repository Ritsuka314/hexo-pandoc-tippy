from panflute import *


def prepare(doc):
    doc.footnotes = []
    doc.footnoteNum = 1


def action(elem, doc):
    if isinstance(elem, Note):
        doc.footnotes.append(
          Div(*elem.content, 
              attributes={ 
                  'class': 'tippy-tooltip', 
                  'id': 'tooltip'+str(doc.footnoteNum), 
                  'style': 'display: none'}))
        doc.footnoteNum += 1


def finalize(doc):
    doc.content.extend(doc.footnotes)

    if doc.get_metadata("standalone", True):
        doc.content.extend([
            RawBlock("<script src='https://unpkg.com/tippy.js@2.0.2/dist/tippy.all.min.js'></script>"),
            RawBlock("<script src='/js/attachTooltips.js'></script>"),
            RawBlock("<link rel='stylesheet' href='/css/tippy.css'>")
        ])
    else:
      # only for embedded contents
      # wrap everything around a scope
      # 
      # for standalone contents do this 
      # in the after post render filter
      # Pandoc only generate toc for
      # headings in the top level
      doc.content = [Div(
          *doc.content,
          classes=["fnScope"])]
    
    del doc.footnotes, doc.footnoteNum


def main(doc=None):
    return run_filter(action, prepare=prepare, finalize=finalize, doc=doc) 


if __name__ == '__main__':
    main()