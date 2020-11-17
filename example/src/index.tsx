import showIt from '../../src'

window['open-ppt'].addEventListener('click', () => {
  // @ts-ignore
  window.reveal = showIt(
    {
      title: {
        selector: '.post-block .post-title',
        global: true,
        type: 'css'
      },
      lvl0: '.post-content article h1',
      lvl1: '.post-content article h2',
      lvl2: '.post-content article h3',
      lvl3: '.post-content article h4',
      text:
        '.post-content article li, .post-content article img, .post-content article p, .post-content article pre, .post-content article table'
    },
    {}
  )
})
