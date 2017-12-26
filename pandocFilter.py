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

    del doc.footnotes, doc.footnoteNum


def main(doc=None):
    return run_filter(action, prepare=prepare, finalize=finalize, doc=doc) 


if __name__ == '__main__':
    main()