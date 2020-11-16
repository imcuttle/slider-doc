# doc-slider

[![Build status](https://img.shields.io/travis/imcuttle/doc-slider/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/doc-slider)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/doc-slider.svg?style=flat-square)](https://codecov.io/github/imcuttle/doc-slider?branch=master)
[![NPM version](https://img.shields.io/npm/v/doc-slider.svg?style=flat-square)](https://www.npmjs.com/package/doc-slider)
[![NPM Downloads](https://img.shields.io/npm/dm/doc-slider.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/doc-slider)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Make html element to be slider view

## Installation

```bash
npm install doc-slider
# or use yarn
yarn add doc-slider
```

## Usage

```javascript
const docSlider = require('doc-slider')

docSlider({
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
