# 快速开始

本文会帮助你从头启动项目

## 环境准备

确保你的环境满足以下要求：

- **git**: 你需要使用 git 来克隆和管理项目版本。[安装教程](../tutorial/git.md)
- **python**: >= 3.10
- **NodeJS**: >=18.0.0，推荐 18.19.0 或更高。[安装教程](../tutorial/nodejs.md)
- **pnpm**: >= 8.0.0，推荐最新版本。

## 代码获取

### 从 GitHub 获取代码

```bash
# 克隆代码
git clone https://github.com/sleep1223/fast-soy-admin
```


### 安装依赖

安装项目依赖

```bash
pdm install 或者 poery install
cd web && pnpm i
```

### 配置后端工具

```bash
pip install ruff
npm install -g pyright
```


## 后端工具命令

```bash
# 静态代码检查
ruff check

# 类型注释检查
pyright -p ./pyproject.toml
```

## npm scripts

```json
{
  // 构建打包(prod环境)
  "build": "vite build --mode prod",
  // 构建打包(test环境)
  "build:test": "vite build --mode test",
  // 删除主项目及子项目的 node_modules, dist, pnpm-lock.yaml
  "cleanup": "sa cleanup",
  // 提交代码 (生成符合 Conventional Commits standard 的提交信息)
  "commit": "sa git-commit",
  // 本地运行(test环境)
  "dev": "vite --mode test",
  // 本地运行(prod环境)
  "dev:prod": "vite --mode prod",
  // 生成路由
  "gen-route": "sa gen-route",
  // eslint检查并自动修复
  "lint": "eslint . --fix",
  // 初始化 simple-git-hooks
  "prepare": "simple-git-hooks",
  // 本地环境预览构建后的dist
  "preview": "vite preview",
  // 发布
  "release": "sa release",
  // vue文件的ts检查
  "typecheck": "vue-tsc --noEmit --skipLibCheck",
  // 更新依赖包
  "update-pkg": "sa update-pkg"
}
```

## 目录说明

```
fast-soy-admin
│  .gitignore
│  .pdm-python
│  pdm.lock
│  pyproject.toml
│  README-en.md
│  README.md
│  run.py
│
├─.idea
├─.ruff_cache
├─.venv
│
├─app
│  │  __init__.py
│  │
│  ├─api
│  │  │  __init__.py
│  │  │
│  │  └─v1
│  │      │  utils.py
│  │      │  __init__.py
│  │      │
│  │      ├─auth
│  │      │      auth.py
│  │      │      __init__.py
│  │      │
│  │      ├─route
│  │      │      route.py
│  │      │      __init__.py
│  │      │
│  │      └─system_manage
│  │              apis.py
│  │              logs.py
│  │              menus.py
│  │              roles.py
│  │              users.py
│  │              __init__.py
│  │
│  ├─controllers
│  │      api.py
│  │      log.py
│  │      menu.py
│  │      role.py
│  │      user.py
│  │      __init__.py
│  │
│  ├─core
│  │      bgtask.py
│  │      crud.py
│  │      ctx.py
│  │      dependency.py
│  │      exceptions.py
│  │      init_app.py
│  │      middlewares.py
│  │
│  ├─log
│  │      log.py
│  │      __init__.py
│  │
│  ├─models
│  │  └─system
│  │          admin.py
│  │          utils.py
│  │          __init__.py
│  │
│  ├─schemas
│  │      apis.py
│  │      base.py
│  │      login.py
│  │      logs.py
│  │      menus.py
│  │      roles.py
│  │      users.py
│  │      __init__.py
│  │
│  ├─settings
│  │      config.py
│  │      __init__.py
│  │
│  └─utils
│          security.py
│          tools.py
│
├─deploy
│  │  entrypoint.sh
│  │  web.conf
│  │
│  └─sample-picture
│          api.jpg
│          group.jpg
│          login.jpg
│          logo.svg
│          menu.jpg
│          role.jpg
│          user.jpg
│          workbench.jpg
│
├─migrations
│  └─app_system
│          0_20240516180141_init.py
│
├─src
│  ├─vue_fastapi_admin
│  │      __init__.py
│  │
│  └─vue_fastapi_admin.egg-info
│          dependency_links.txt
│          PKG-INFO
│          requires.txt
│          SOURCES.txt
│          top_level.txt
│
└─tests
        create_role.py
        create_user.py
        __init__.py


```


```
fast-soy-admin-web
├── .vscode                        //vscode插件和设置
│   ├── extensions.json            //vscode推荐的插件
│   ├── launch.json                //debug配置文件(debug Vue 和 TS)
│   └── settings.json              //vscode配置(在该项目中生效，可以复制到用户配置文件中)
├── build                          //vite构建相关配置和插件
│   ├── config                     //构建打包配置
│   │   └── proxy.ts               //网络请求代理
│   └── plugins                    //构建插件
│       ├── index.ts               //插件汇总
│       ├── router.ts              //elegant-router插件
│       ├── unocss.ts              //unocss插件
│       └── unplugin.ts            //自动导入UI组件、自动解析iconify图标、自动解析本地svg作为图标
├── packages                       //子项目
│   ├── axios                      //网络请求封装
│   ├── color-palette              //颜色调色板
│   ├── hooks                      //组合式函数hooks
│   ├── materials                  //组件物料
│   ├── ofetch                     //网络请求封装
│   ├── scripts                    //脚本
│   ├── uno-preset                 //uno-preset配置
│   └── utils                      //工具函数
├── public                         //公共目录(文件夹里面的资源打包后会在根目录下)
│   └── favicon.svg                //网站标签图标
├── src
│   ├── assets                     //静态资源
│   │   ├── imgs                   //图片
│   │   └── svg-icon               //本地svg图标
│   ├── components                 //全局组件
│   │   ├── advanced               //高级组件
│   │   ├── common                 //公共组件
│   │   └── custom                 //自定义组件
│   ├── constants                  //常量
│   │   ├── app.ts                 //app常量
│   │   ├── business.ts            //业务常量
│   │   ├── common.ts              //通用常量
│   │   └── reg.ts                 //正则常量
│   ├── enums                      //枚举
│   ├── hooks                      //组合式的函数hooks
│   │   ├── business               //业务hooks
│   │   │   ├── auth               //用户权限
│   │   │   └── captcha            //验证码
│   │   └── common                 //通用hooks
│   │       ├── echarts            //echarts
│   │       ├── form               //表单
│   │       ├── icon               //图标
│   │       ├── router             //路由
│   │       └── table              //表格
│   ├── layouts                    //布局组件
│   │   ├── base-layout            //基本布局(包含全局头部、多页签、侧边栏、底部等公共部分)
│   │   ├── blank-layout           //空白布局组件(单个页面)
│   │   ├── context                //布局组件的上下文状态
│   │   ├── hooks                  //布局组件的hooks
│   │   └── modules                //布局组件模块
│   │       ├── global-breadcrumb  //全局面包屑
│   │       ├── global-content     //全局主体内容
│   │       ├── global-footer      //全局底部
│   │       ├── global-header      //全局头部
│   │       ├── global-logo        //全局Logo
│   │       ├── global-menu        //全局菜单
│   │       ├── global-search      //全局搜索
│   │       ├── global-sider       //全局侧边栏
│   │       ├── global-tab         //全局标签页
│   │       └── theme-drawer       //主题抽屉
│   ├── locales                //国际化配置
│   │   ├── langs              //语言文件
│   │   ├── dayjs.ts           //dayjs的国际化配置
│   │   ├── locale.ts          //语言文件汇总
│   │   └── naive.ts           //NaiveUI的国际化配置
│   ├── plugins                //插件
│   │   ├── assets.ts          //各种依赖的静态资源导入(css、scss等)
│   │   ├── dayjs.ts           //dayjs插件
│   │   ├── iconify.ts         //iconify插件
│   │   ├── loading.ts         //全局初始化时的加载插件
│   │   └── nprogress.ts       //顶部加载条nprogress插件
│   ├── router                 //vue路由
│   │   ├── elegant            //elegant-router插件生成的路由声明、导入和转换等文件
│   │   ├── guard              //路由守卫
│   │   ├── routes             //路由声明入口
│   │   │   ├── builtin        //系统内置路由 根路由和未找到路由
│   │   │   └── index          //前端静态路由创建的入口
│   │   └── index.ts           //路由插件入口
│   ├── service                //网络请求
│   │   ├── api                //接口api
│   │   └── request            //封装的请求函数
│   ├── store                  //pinia状态管理
│   │   ├── modules            //状态管理划分的模块
│   │   │   ├── app            //app状态(页面重载、菜单折叠、项目配置的抽屉)
│   │   │   ├── auth           //auth状态(用户信息、用户权益)
│   │   │   ├── route          //route状态(动态路由、菜单、路由缓存)
│   │   │   ├── tab            //tab状态(多页签、缓存页面的滚动位置)
│   │   │   └── theme          //theme状态(项目主题配置)
│   │   └── plugins            //状态管理插件
│   ├── styles                 //全局样式
│   │   ├── css                //css
│   │   └── scss               //scss
│   ├── theme                  //主题配置
│   │   ├── settings.ts        //主题默认配置及覆盖配置
│   │   └── vars.ts            //主题token对应的css变量
│   ├── typings                //TS类型声明文件(*.d.ts)
│   │   ├── api.d.ts           //请求接口返回的数据的类型声明
│   │   ├── app.d.ts           //应用相关的类型声明
│   │   ├── common.d.ts        //通用类型声明
│   │   ├── components.d.ts    //自动导入的组件的类型声明
│   │   ├── elegant-router.d.ts//插件elegant-router生成的路由声明
│   │   ├── env.d.ts           //vue路由描述和请求环境相关的类型声明
│   │   ├── global.d.ts        //全局通用类型
│   │   ├── naive-ui.d.ts      //NaiveUI类型
│   │   ├── router.d.ts        //Vue的路由描述的类型声明
│   │   ├── storage.d.ts       //本地缓存的数据类型
│   │   └── union-key.d.ts     //联合类型
│   ├── utils                  //全局工具函数(纯函数，不含状态)
│   │   ├── common             //通用工具函数
│   │   ├── icon               //图标相关工具函数
│   │   ├── service            //请求服务配置相关的工具函数
│   │   └── storage            //存储相关工具函数
│   ├── views                  //页面
│   │   ├── _builtin           //系统内置页面：登录、异常页等
│   │   ├── about              //关于
│   │   ├── function           //功能
│   │   ├── home               //首页
│   │   ├── manage             //系统管理
│   │   ├── multi-menu         //多级菜单
│   │   └── user-center        //用户中心
│   ├── App.vue                //Vue文件入口
│   └── main.ts                //项目入口TS文件
├── .editorconfig              //统一编辑器配置
├── .env                       //环境文件
├── .env.prod                  //生产环境的环境文件
├── .env.test                  //测试环境的环境文件
├── .gitattributes             //git属性配置
├── .gitignore                 //忽略git提交的配置文件
├── .npmrc                     //npm配置
├── CHANGELOG.md               //项目更新日志
├── eslint.config.js           //eslint flat配置文件
├── index.html                 //html文件
├── package.json               //npm依赖描述文件
├── pnpm-lock.yaml             //npm包管理器pnpm依赖锁定文件
├── README.md                  //项目介绍文档
├── README.zh-CN.md            //项目介绍文档(中文)
├── tsconfig.json              //TS配置
├── uno.config.ts              //原子css框架unocss配置
└── vite.config.ts             //vite配置
```
