import { defineConfig } from 'vitepress';
import en from './locales/en.js';

export default defineConfig({
  base: '/fast-soy-admin-docs/',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      title: 'FastSoyAdmin',
      description: '基于 FastAPI 和 Vue3 的全栈后台管理模板'
    },
    en
  },
  head: [
    ['meta', { name: 'author', content: 'sleep1223' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'fast-soy-admin, fastapi, vue3, admin template, soybean-admin, full-stack'
      }
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/fast-soy-admin-docs/logo.svg' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      }
    ]
  ],
  assetsDir: 'public',
  srcDir: 'src',
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sleep1223/fast-soy-admin' }
    ],
    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2024 sleep1223'
    },
    nav: [
      { text: '指南', link: '/guide/intro', activeMatch: '/guide/' },
      { text: '后端', link: '/backend/intro', activeMatch: '/backend/' },
      { text: '规范', link: '/standard/', activeMatch: '/standard/' },
      { text: '常见问题', link: '/faq/', activeMatch: '/faq/' },
      {
        text: '链接',
        items: [
          { text: '在线预览', link: 'https://fast-soy-admin.sleep0.de/' },
          { text: 'API 文档 (Apifox)', link: 'https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b' },
          { text: 'SoybeanAdmin', link: 'https://github.com/soybeanjs/soybean-admin' },
          { text: 'SoybeanAdmin 文档', link: 'https://docs.soybeanjs.cn' },
          { text: 'FastAPI', link: 'https://fastapi.tiangolo.com/' },
          { text: 'Tortoise ORM', link: 'https://tortoise.github.io' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/guide/intro' },
            { text: '快速开始', link: '/guide/quick-start' }
          ]
        },
        {
          text: '主题',
          items: [
            { text: '简介', link: '/guide/theme/intro' },
            { text: '配置', link: '/guide/theme/config' },
            { text: 'UnoCSS 主题', link: '/guide/theme/unocss' }
          ]
        },
        {
          text: '图标',
          items: [
            { text: '简介', link: '/guide/icon/intro' },
            { text: '使用方式', link: '/guide/icon/usage' }
          ]
        },
        {
          text: '路由',
          items: [
            { text: '简介', link: '/guide/router/intro' },
            { text: '路由结构', link: '/guide/router/structure' },
            { text: '创建路由', link: '/guide/router/create' },
            { text: '动态路由', link: '/guide/router/dynamic' },
            { text: '路由缓存', link: '/guide/router/cache' },
            { text: '路由组件', link: '/guide/router/component' },
            { text: '路由跳转', link: '/guide/router/push' },
            { text: '路由守卫', link: '/guide/router/guard' }
          ]
        },
        {
          text: '请求',
          items: [
            { text: '简介', link: '/guide/request/intro' },
            { text: '使用方式', link: '/guide/request/usage' },
            { text: '代理', link: '/guide/request/proxy' },
            { text: '对接后端', link: '/guide/request/backend' }
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useTable', link: '/guide/hooks/use-table' }
          ]
        }
      ],
      '/backend/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/backend/intro' },
            { text: '架构', link: '/backend/architecture' }
          ]
        },
        {
          text: '核心',
          items: [
            { text: '数据模型', link: '/backend/models' },
            { text: 'API 路由', link: '/backend/api' },
            { text: '认证与权限', link: '/backend/auth' },
            { text: 'CRUD 基类', link: '/backend/crud' },
            { text: '响应码', link: '/backend/codes' }
          ]
        },
        {
          text: '运维',
          items: [
            { text: '配置', link: '/backend/config' },
            { text: '部署', link: '/backend/deployment' }
          ]
        }
      ],
      '/standard/': [
        { text: '概述', link: '/standard/' },
        { text: '命名规范', link: '/standard/naming' },
        { text: 'Vue 书写风格', link: '/standard/vue' },
        { text: '后端风格', link: '/standard/backend' }
      ],
      '/faq/': [
        { text: '常见问题', link: '/faq/' }
      ]
    }
  }
});
