/**
 * Make html element to be slider view
 * @author imcuttle
 */

import parseElementTree from 'wowsearch-parse'
import { htmlEscape } from 'escape-goat'
import { Selector } from 'wowsearch-parse/dist/types/Config'
import DocumentNode from 'wowsearch-parse/dist/types/DocumentNode'
import ContentNode from 'wowsearch-parse/dist/types/ContentNode'

import { HotKeyChainManager } from 'hotkey-chain'

import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/blood.css'

import Zoom from 'reveal.js/plugin/zoom/zoom.esm.js'
import Search from 'reveal.js/plugin/search/search.esm.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js'
import 'reveal.js/plugin/highlight/monokai.css'

import runSeq from 'run-seq'
import LvlNode from 'wowsearch-parse/dist/types/LvlNode'

import './style.css'
import TextNode from 'wowsearch-parse/dist/types/TextNode'
import { selectAll } from 'wowsearch-parse/dist/selectVal'

type Selectors = Partial<Parameters<typeof parseElementTree>[1]> & {
  [name: string]: Selector
}

type Options = {
  document?: Document
  excludes?: Selector[]
  mountContainer?: Element
  revealConfig?: any
  renderers?: typeof defaultRenderers
  renderSection?(child: string, node: any, ctx: any): string
  renderSectionAttrs?(node: any, ctx: any): string
  injectId?: boolean
  injectIdPrefix?: string
}

const defaultRenderers = [
  (vNode: any, ctx, render) => {
    if (vNode.type === 'document' && vNode.global.get('title')) {
      return `${ctx.renderSection(
        [
          `<h2 class="slider-doc-document-title">${htmlEscape(vNode.global.get('title'))}</h2>`,
          vNode.global.get('author') &&
            `<small class="slider-doc-document-author">作者：${htmlEscape(vNode.global.get('author'))}</small>`
        ]
          .filter(Boolean)
          .join(''),
        vNode,
        ctx
      )}${render(vNode.children)}`
    }
    return render()
  },
  (vNode: LvlNode, ctx, render) => {
    if (vNode.type === 'lvl') {
      if (!vNode.value.trim()) {
        return ''
      }
      return `${ctx.renderSection(
        (vNode.domNode as HTMLElement).outerHTML || htmlEscape(vNode.value),
        vNode,
        ctx
      )}${render(vNode.children)}`
    }
    return render()
  },
  (vNode: ContentNode, ctx, render) => {
    if (vNode.type === 'text') {
      if (!vNode.value.trim()) {
        return ''
      }
      return `${(vNode.domNode as HTMLElement).outerHTML || htmlEscape(vNode.value)}`
    }
    return render()
  }
]

const flattenLvlNode = (node: any) => {
  return node.reduce((acc, node) => {
    let nodes = acc
    if (node.type === 'lvl') {
      const head = new TextNode(node.value)
      head.domNode = node.domNode
      nodes.push(head)

      node.children.forEach((childNode) => {
        nodes = nodes.concat(flattenLvlNode([childNode]))
      })

      return nodes
    }

    return nodes.concat(node)
  }, [])
}

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
        let nodes = node
        if (ctx.depth) {
          nodes = flattenLvlNode(node)
        }

        return nodes
          .map((node, index) => {
            const newCtx = { ...ctx, index }
            return renderSection(next(node, newCtx) || '', node, newCtx)
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
        if (args.length && Array.isArray(args[0])) {
          return next.all(...args, {
            ...ctx,
            parent: node,
            parentCtx: ctx,
            depth: ctx.depth + 1
          })
        }

        return next(...args.concat([node, ctx].slice(args.length)))
      })
    })

  const state = {
    documentNode,
    global,
    depth: 0,
    parent: null,
    index: 0
  }

  const cloned = new DocumentNode()
  Object.assign(cloned, documentNode)
  cloned.children = []
  const globalScreen = runSeq(renderList, [cloned, state])

  return globalScreen + runSeq(renderList, [documentNode.children, state])
}

function randomInt(min = 0, max = 1) {
  return Math.round((Math.random() * (max - min + 1) + min) | 0)
}

function sliderDoc(
  selector: Selectors,
  {
    document = global.document,
    excludes = [],
    revealConfig,
    mountContainer = document.body,
    renderers = [],
    renderSection,
    renderSectionAttrs = () => {
      return `data-transition="fade-in slide-out"`
    },
    injectId = true,
    injectIdPrefix = 'slider-doc_'
  }: Options = {}
) {
  const bodyElem = document.body.cloneNode(true) as any

  const bodyContainer = document.createElement('div')
  const nodes = [...bodyElem.children]
  nodes.forEach((child) => {
    bodyContainer.appendChild(child)
  })

  bodyContainer.style.opacity = '0'
  bodyContainer.style.zIndex = '-1000'
  bodyContainer.style.pointerEvents = 'none'

  document.body.appendChild(bodyContainer)
  excludes.forEach((selectorExclude) => {
    const elems = selectAll(bodyContainer, selectorExclude)
    elems.forEach((elem) => elem.remove())
  })
  // return
  const documentNode = parseElementTree(bodyContainer, selector, { allowInnerText: true })

  console.log(documentNode)

  let count = 0
  renderSection =
    renderSection ||
    ((child, node, ctx) => {
      child = child.trim()
      if (!child) {
        return ''
      }
      if (ctx.depth > 2) {
        return child
      }

      let id = node.domNode?.getAttribute('id') || node.domNode?.getAttribute('name') || count++

      const attrs = injectId ? `id="${injectIdPrefix}${id}"` : ''
      return `<section ${attrs} ${renderSectionAttrs(node, ctx)}>${child}</section>`
    })
  const html = generateHTML(documentNode, renderers, renderSection)

  const container = document.createElement('div')
  container.className = 'slider-doc-container reveal'
  container.style.zIndex = String(Number.MAX_SAFE_INTEGER)

  container.innerHTML = `<div class="slides">
${html}
</div>`

  mountContainer.appendChild(container)

  const reveal = new Reveal(container, {
    embedded: true,
    backgroundTransition: 'slide',
    hash: true,
    overview: true,
    slideNumber: true,
    plugins: [Highlight(), Zoom(), Search()],
    ...revealConfig
    // keyboardCondition: 'focused'
  })
  reveal.initialize()
  reveal.bodyContainer = bodyContainer

  reveal.destroy = () => {
    m.stop()
    reveal.bodyContainer.remove()
    reveal.getRevealElement().remove()
  }

  const m = new HotKeyChainManager(document as any)
    .on('mod+escape', (event, next) => {
      reveal.destroy()
    })
    .start()

  function resetSlideScrolling(slide) {
    slide?.classList?.remove('slider-doc-scrollable-slide')
  }

  function handleSlideScrolling(slide) {
    if (slide?.clientHeight >= 700) {
      slide?.classList?.add('slider-doc-scrollable-slide')
    }
  }

  reveal.addEventListener('ready', function (event) {
    handleSlideScrolling(event.currentSlide)
  })

  reveal.addEventListener('slidechanged', function (event) {
    resetSlideScrolling(event.previousSlide)
    handleSlideScrolling(event.currentSlide)
  })

  return reveal
}

export default sliderDoc
