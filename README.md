# COBEN Calculator

This is a COBEN calculator made with [Mavo](https://mavo.io), bundled with [Rollup](https://rollupjs.org). I'm using these two tools for the learning experience.

## Isn't there another one?

I do know about [DocDesk's COBEN calculator](https://doc671.web.app/COBEN/). My calculator is designed with the following goals in mind:

- Easy mass data entry
- Systematic calculation
- Mobile friendliness
- Any number of decimal places
- JSON I/O

## Video demo

[This demo](https://youtu.be/UPmZ1K6ozZk) features this app as of [`3d2ff90`](https://github.com/C-Ezra-M/coben-calc/commit/3d2ff9012cd6f863f646fe58eee489209aef36de).

## Bugs

Bugs can be unexpected. In that case, [create a new issue](https://github.com/C-Ezra-M/coben-calc/issues/new). Make sure to include information on what your browser is ([WhatIsMyBrowser.com](https://www.whatismybrowser.com/) can help you with this) and the data you attempted to use (names optional; if it's too long the minimum is a number of entries).

## Rebuilding Mavo

```sh
git clone https://github.com/C-Ezra-M/mavo
git branch patch-20240701
git pull https://github.com/C-Ezra-M/mavo patch-20240701
cd mavo
gulp # or npx gulp
cd ..
copy mavo/dist/mavo.min.js public/mavo.js
```
