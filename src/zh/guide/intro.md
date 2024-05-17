# 介绍

[`FastSoyAdmin`](https://github.com/sleep1223/fast-soy-admin) 是一个清新优雅、高颜值且功能强大的后台管理模板，基于最新的前后端端技术栈，包括 FastAPI, Pydantic, Tortoise ORM, Vue3, Vite5, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。`FastSoyAdmin` 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。

## 特性

- **前沿技术应用**：后端采用 FastAPI, Pydantic, Tortoise ORM, 前端采用 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS 等最新流行的技术栈。
- **独特的权限控制**：后端实现了独特的权限控制，前后端用户角色权限严格分离。
- **详细的日志管理**：基于[`SoybeanAdmin`](https://github.com/soybeanjs/soybean-admin)，结合实际业务需求，新增了日志管理和API权限控制功能，实现了后端权限的二次验证。
- **后端集成大量实用工具**：代码耦合度低，并重写了部分实用函数。
- **清晰的项目架构**：前端采用 pnpm monorepo 架构，结构清晰，优雅易懂。
- **严格的代码规范**：前端遵循 [SoybeanJS 规范](/zh/standard/)，集成了eslint, prettier 和 simple-git-hooks，后端使用 [Ruff](https://docs.astral.sh/ruff/) [Pyright](https://microsoft.github.io/pyright), 保证代码的规范性。
- **TypeScript**： 支持严格的类型检查，提高代码的可维护性。
- **丰富的主题配置**：内置多样的主题配置，与 UnoCSS 完美结合。
- **内置国际化方案**：轻松实现多语言支持。
- **丰富的页面组件**：内置多样页面和组件，包括403、404、500页面，以及布局组件、标签组件、主题配置组件等。
- **命令行工具**：内置高效的命令行工具，git提交、删除文件、发布等。
- **移动端适配**：完美支持移动端，实现自适应布局。

## 相关

- [预览地址](https://fast-soy-admin2.sleep0.de/)
- [项目文档](https://sleep1223.github.io/fast-soy-admin-docs/zh/)
- [Apifox文档](https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b)
- [Github 仓库](https://github.com/sleep1223/fast-soy-admin)
- [SoybeanAdmin](https://gitee.com/honghuangdc/soybean-admin)



## 文档

- 文档地址为 [fast-soy-admin-docs](https://github.com/sleep1223/fast-soy-admin-docs)，采用 Vitepress 开发。如发现文档有误，欢迎提 pr 帮助我们改进。

## 需要掌握的基础知识

本项目后端基于 FastAPI, Pydantic, Tortoise ORM 开发

- [FastAPI](https://fastapi.tiangolo.com/)
- [Tortoise ORM](https://tortoise.github.io/)
- [Pydantic](https://docs.pydantic.dev/)

本项目前端基于 Vue3, Vite, TS 开发，并全部采用了 Vue3 的**script-setup**写法，建议在开发前先学一下以下内容，提前了解和学习这些知识，会对项目理解非常有帮助:

- [ES6](https://es6.ruanyifeng.com/)
- [Vue3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://jkchao.github.io/typescript-book-chinese/#why)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [UnoCSS](https://uno.antfu.me/)
- [VueUse](https://vueuse.org/)
- [NaiveUI](https://www.naiveui.com/zh-CN/os-theme)
- [AntDesign Vue](https://www.antdv.com/components/overview-cn/)

## 浏览器支持

本地开发推荐使用`Chrome 100+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/)IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                not support                                                                                                                |                                                                                          last 2 versions                                                                                          |                                                                                               last 2 versions                                                                                                |                                                                                             last 2 versions                                                                                              |                                                                                             last 2 versions                                                                                              |

## 如何加入我们

- [FastSoyAdmin](https://github.com/sleep1223/fast-soy-admin) 还在持续更新中，本项目欢迎您的参与，共同维护，逐步完善，将项目做得更强。项目采用 MIT 开源协议，本着一切免费的原则，原则上不会收取任何费用及版权，可以放心使用。
- 如果你想加入我们，可以多提供一些好的建议或者提交 pr，我们会根据你的活跃度邀请你加入。


![QQ交流群][src\assets\qqgroup.jpg]
