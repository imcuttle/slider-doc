# slider-doc

[![Build status](https://img.shields.io/travis/imcuttle/slider-doc/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/slider-doc)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/slider-doc.svg?style=flat-square)](https://codecov.io/github/imcuttle/slider-doc?branch=master)
[![NPM version](https://img.shields.io/npm/v/slider-doc.svg?style=flat-square)](https://www.npmjs.com/package/slider-doc)
[![NPM Downloads](https://img.shields.io/npm/dm/slider-doc.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/slider-doc)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Make html element to be slider view

一建转换文档为 PPT 演示

**快捷键列表：**

- ESC / O : 打开整体预览模式
- Cmd + ESC / Ctrl + ESC: 退出 PPT 模式
- 方向键：PPT 翻页

## Installation

```bash
npm install slider-doc
# or use yarn
yarn add slider-doc
```

## Usage

```javascript
const sliderDoc = require('slider-doc')

const silder = sliderDoc({
  lvl0: '.doc h1',
  lvl1: '.doc h2',
  lvl2: '.doc h3',
  lvl3: '.doc h4',
  lvl4: '.doc h5'
})
```

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
