import showIt from '../../src'

showIt(
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
      '.ct-editor-wrapper .pm-body-wrapper p, .ct-editor-wrapper .pm-body-wrapper .ct-code .CodeMirror-code, .ct-editor-wrapper .pm-body-wrapper li'
  },
  {
    // renderSectionAttrs: (node, ctx) => {
    //   return ''
    // }
  }
)
