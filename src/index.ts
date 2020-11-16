/**
 * Make html element to be slider view
 * @author imcuttle
 */

import parseElementTree from 'wowsearch-parse'
import { Selector } from 'wowsearch-parse/dist/types/Config'
import DocumentNode from 'wowsearch-parse/dist/types/DocumentNode'
import ContentNode from 'wowsearch-parse/dist/types/ContentNode'

import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/blood.css'

import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js'
import Search from 'reveal.js/plugin/search/search.esm.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js'

import runSeq from 'run-seq'
import LvlNode from 'wowsearch-parse/dist/types/LvlNode'

import './style.css'
import * as webpack from 'webpack'

type Selectors = Partial<Parameters<typeof parseElementTree>[1]> & {
  [name: string]: Selector
}

type Options = {
  document?: Document
  mountContainer?: Element
  revealConfig?: any
  renderers?: typeof defaultRenderers
  renderSection?(child: string, node: any, ctx: any): string
  renderSectionAttrs?(node: any, ctx: any): string
  injectId?: boolean
  injectIdPrefix?: string
}

const defaultRenderers = [
  (vNode: LvlNode, ctx, render) => {
    if (vNode.type === 'lvl') {
      return `${ctx.renderSection((vNode.domNode as HTMLElement).outerHTML || vNode.value, vNode, ctx)}${render(
        vNode.children
      )}`
    }
    return render()
  },
  (vNode: ContentNode, ctx, render) => {
    if (vNode.type === 'text') {
      return `${(vNode.domNode as HTMLElement).outerHTML || vNode.value}`
    }
    return render()
  }
]

function generateHTML(
  documentNode: DocumentNode,
  renderers: typeof defaultRenderers,
  renderSection = (child, node, ctx) => child
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
        return node
          .map((node) => {
            return renderSection(next(node) || '', node, ctx)
          })
          .join('\n')
      }

      return next()
    }
  ]
    .concat(renderers.filter(Boolean), defaultRenderers)
    .concat((node, ctx) => {
      console.error(`Node un support: ${node.type}`, node)
      return ''
    })
    .map((render) => (node, ctx, next) => {
      return render(node, ctx, (...args) => {
        ctx.renderSection = renderSection
        if (args.length) {
          return next.all(...args, {
            ...ctx,
            parent: node,
            depth: ctx.depth + 1
          })
        }
        return next(node, ctx)
      })
    })

  const state = {
    documentNode,
    global,
    depth: 0
  }

  return runSeq(renderList, [documentNode.children, state])
}

function showIt(
  selector: Selectors,
  {
    document = global.document,
    revealConfig,
    mountContainer = document.body,
    renderers = [],
    renderSection,
    renderSectionAttrs = () => 'data-transition="fade-in slide-out"',
    injectId = true,
    injectIdPrefix = 'show-it_'
  }: Options = {}
) {
  const documentNode = parseElementTree(document.documentElement, selector)

  const idMap = {}
  renderSection =
    renderSection ||
    ((child, node, ctx) => {
      idMap[ctx.depth] = idMap[ctx.depth] || 0
      idMap[ctx.depth]++
      const attrs = injectId ? `id="${injectIdPrefix}${idMap[ctx.depth]}/${ctx.depth + 1}"` : ''
      return `<section ${attrs} ${renderSectionAttrs(node, ctx)}>${child}</section>`
    })
  const html = generateHTML(documentNode, renderers, renderSection)

  const container = document.createElement('div')
  container.className = 'show-it-container reveal'
  container.style.zIndex = String(Number.MAX_SAFE_INTEGER)

  container.innerHTML = `<div class="slides">
${html}
</div>`

  mountContainer.appendChild(container)

  const reveal = new Reveal(container, {
    embedded: true,
    backgroundTransition: 'slide',
    slideNumber: true,
    plugins: [Highlight(), Zoom(), Search()],
    ...revealConfig
    // keyboardCondition: 'focused'
  })
  reveal.initialize()

  return reveal
}

export default showIt
