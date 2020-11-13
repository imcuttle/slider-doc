/**
 * Make html element to be slider view
 * @author imcuttle
 */

import parseElementTree from 'wowsearch-parse'
import * as Reveal from 'reveal.js'
import { Selector } from 'wowsearch-parse/dist/types/Config'
import DocumentNode from 'wowsearch-parse/dist/types/DocumentNode'
import runSeq, { waterFall } from 'run-seq'

type Selectors = Partial<Parameters<typeof parseElementTree>[1]> & {
  [name: string]: Selector
}

type Options = {
  document?: Document
}

const defaultRenderers = [
  (node, state, render) => {
    return render()
    // if (node.type === 'lvl') {
    //   return ''
    // }
  }
]

function generateHTML(
  documentNode: DocumentNode,
  renderers: typeof defaultRenderers,
  renderSection = (node, child) => child
) {
  const global = {}
  for (const [name, value] of documentNode.global.entries()) {
    global[name] = value
  }

  const renderList = [
    (node, ctx, next) => {
      if (!node) {
        return ''
      }
      if (Array.isArray(node)) {
        let renderWrap = (node, child) => child
        if (node === documentNode.children) {
          renderWrap = renderSection
        }

        return node
          .map((node) => {
            return renderWrap(node, next(node) || '')
          })
          .join('\n')
      }

      return next()
    }
  ]
    .concat(defaultRenderers, renderers.filter(Boolean))
    .concat((node, ctx) => {
      console.error(`Node un support: ${node.type}`, node)
      return ''
    })
    .map((render) => (node, ctx, next) => {
      return render(node, ctx, (...args) => {
        if (args.length) {
          return next.all(...args, ctx)
        }
        return next(node, ctx)
      })
    })

  const state = {
    documentNode,
    global
  }

  return runSeq(renderList, [documentNode.children, state])
}

function showIt(selector: Selectors, { document = global.document }: Options = {}) {
  // reveal.
  const documentNode = parseElementTree(document.documentElement, selector)
  console.log('documentNode', documentNode)

  generateHTML(documentNode, [])

  const container = document.createElement('div')
  container.className = 'show-it-container'

  // container.

  document.body.appendChild(container)

  const reveal = new Reveal(container, {
    embedded: true,
    keyboardCondition: 'focused'
  })
  reveal.initialize()

  return reveal
}

export default showIt
