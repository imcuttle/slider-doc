import showIt from '../../src'
import { htmlEscape } from 'escape-goat'
import any = jasmine.any

// @ts-ignore
window.reveal = showIt(
  {
    title: {
      selector: '.ct-editor-wrapper .ct-title-wrapper .ct-title-p',
      global: true,
      type: 'css'
    },
    createUser: {
      selector: '.ct-editor-wrapper .ct-doc-info .ct-user-name',
      global: true,
      type: 'css'
    },
    lvl0: '.ct-editor-wrapper .pm-body-wrapper h1',
    lvl1: '.ct-editor-wrapper .pm-body-wrapper h2',
    lvl2: '.ct-editor-wrapper .pm-body-wrapper h3',
    lvl3: '.ct-editor-wrapper .pm-body-wrapper h4',
    lvl4: '.ct-editor-wrapper .pm-body-wrapper h5',
    text:
      '.ct-editor-wrapper .pm-body-wrapper p, .ct-editor-wrapper .pm-body-wrapper .ct-code .CodeMirror-code, .ct-editor-wrapper .pm-body-wrapper ul, .ct-editor-wrapper .pm-body-wrapper ol, .ct-editor-wrapper .pm-body-wrapper li'
  },
  {
    renderers: [
      (vNode, ctx, render) => {
        const domNode: any = vNode.domNode
        if (domNode?.querySelectorAll) {
          domNode.querySelectorAll('.ct-code').forEach((node) => {
            const codeBase = node.querySelector('.CodeMirror-code')
            //
            const container = document.createElement('section')
            container.innerHTML = `<pre><code data-trim data-noescape>${htmlEscape(codeBase.textContent)}</code></pre>`
            node.replaceWith(container)
          })
        }

        return render()
      },
      (vNode, ctx, render) => {
        const domNode = vNode.domNode as HTMLElement
        if (domNode.classList.contains('CodeMirror-code')) {
          return `<pre><code data-trim data-noescape>${htmlEscape(vNode.value)}</code></pre>`
        }

        return render()
      }
    ]
    // renderSectionAttrs: (node, ctx) => {
    //   return ''
    // }
  }
)
