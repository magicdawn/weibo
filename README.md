# weibo

<!-- [![Build Status](https://img.shields.io/github/actions/workflow/status/magicdawn/weibo/ci.yml?style=flat-square&branch=main)](https://github.com/magicdawn/weibo/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/weibo.svg?style=flat-square)](https://codecov.io/gh/magicdawn/weibo)
[![npm version](https://img.shields.io/npm/v/weibo.svg?style=flat-square)](https://www.npmjs.com/package/weibo)
[![npm downloads](https://img.shields.io/npm/dm/weibo.svg?style=flat-square)](https://www.npmjs.com/package/weibo)
[![npm license](https://img.shields.io/npm/l/weibo.svg?style=flat-square)](http://magicdawn.mit-license.org) -->

## How to

- git clone
- 设置 chrome 执行路径, 写死了 macOS 上的 `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, 按实际情况修改 src/pptr.ts
- `pnpm install`
- `pnpm link --global`
- `weibo <uid>` 即可

## Other Resources

- https://github.com/Chilfish/Weibo-archiver
- https://github.com/yukinotech/WeiboDL

## Dev

- `data/weibo.db` 空 sqlite db 生成: `pnpm drizzle-kit push`

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
