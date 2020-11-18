# slider-doc

[![Build status](https://img.shields.io/travis/imcuttle/slider-doc/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/slider-doc)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/slider-doc.svg?style=flat-square)](https://codecov.io/github/imcuttle/slider-doc?branch=master)
[![NPM version](https://img.shields.io/npm/v/slider-doc.svg?style=flat-square)](https://www.npmjs.com/package/slider-doc)
[![NPM Downloads](https://img.shields.io/npm/dm/slider-doc.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/slider-doc)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Make html element to be slider view

一建转换文档为 PPT 演示

[在线 DEMO](http://imcuttle.github.io/slider-doc)

**快捷键列表：**

- ESC / O : 打开整体预览模式
- Cmd + ESC / Ctrl + ESC: 退出 PPT 模式
- 方向键：PPT 翻页

## 原理

![image.png](https://i.loli.net/2020/11/18/J9WMnEPr6D7C5aL.png)

解析 DOM 树，生成树结构如下：

```html
<h1>标题</h1>
<p>内容</p>
<h2>标题2</h2>
<p>内容2</p>
```

会解析成

```json5
{
  type: 'lvl',
  level: 1,
  value: '标题',
  children: [
    {
      type: 'text',
      value: '内容'
    },
    {
      type: 'lvl',
      level: 2,
      value: '标题2',
      children: [
        {
          type: 'text',
          value: '内容2'
        }
      ]
    }
  ]
}
```

## Installation

```bash
npm install slider-doc
# or use yarn
yarn add slider-doc
```

## Usage

```javascript
import sliderDoc from 'slider-doc'

const silder = sliderDoc({
  lvl0: '.doc h1',
  lvl1: '.doc h2',
  lvl2: '.doc h3',
  lvl3: '.doc h4',
  lvl4: '.doc h5'
})
```

## API

### `sliderDoc(selectors, options?)`

#### `selectors`

- **Type:** [Selectors](https://github.com/big-wheel/wowsearch/tree/master/packages/wowsearch#selectors-1)

#### `options`

##### `document`

- **Type:** `Document`
- **Default:** `document`

##### `excludes`

解析 dom 之前，需要剔除的 element

- **Type:** `Selector[]` - see [Selector](https://github.com/big-wheel/wowsearch/tree/master/packages/wowsearch#selector)
- **Default:** `[]`

##### `revealConfig`

Reveal.js 的[配置](https://revealjs.com/config/)

##### `mountContainer`

Reveal.js 挂载的节点

- **Type:** `Element`
- **Default:** `document.body`

##### `renderers`

自定义渲染

- **Type:** `Array<(vNode, ctx, next) => string>`
- **Default:** `[]`
- **Example:**

  ```js
  ;[
    (vNode, ctx, next) => {
      if (vNode.type === 'text') {
        return `<span>${vNode.value}</span>`
      }
      return next()
    }
  ]
  ```

##### `renderSectionAttrs`

渲染外层 Section 时候注入的属性

- **Type:** `(vNode, ctx) => string`
- **Default:** `() => 'data-transition="fade-in slide-out"'`

## Todo

- [ ] Feat: 生成 reveal.js 的 dom 实例，而不是 html，可以带上 dom 交互（如 React 组件）

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:imcuttle@163.com">imcuttle@163.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
