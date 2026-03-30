import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: '简体中文',
  lang: 'zh',
  dir: 'src/zh',
  title: 'FastSoyAdmin',
  description: '基于 FastAPI 和 Vue3 的全栈后台管理模板',
  themeConfig: {
    nav: [
      { text: '指南', link: '/zh/guide/intro', activeMatch: '/zh/guide/' },
      { text: '后端', link: '/zh/backend/intro', activeMatch: '/zh/backend/' },
      { text: '规范', link: '/zh/standard/', activeMatch: '/zh/standard/' },
      { text: '常见问题', link: '/zh/faq/', activeMatch: '/zh/faq/' },
      {
        text: '链接',
        items: [
          { text: '在线预览', link: 'https://fast-soy-admin.sleep0.de/' },
          { text: 'API 文档 (Apifox)', link: 'https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b' },
          { text: 'SoybeanAdmin', link: 'https://github.com/soybeanjs/soybean-admin' },
          { text: 'FastAPI', link: 'https://fastapi.tiangolo.com/' },
          { text: 'Tortoise ORM', link: 'https://tortoise.github.io' }
        ]
      }
    ],
    sidebar: {
      '/zh/guide/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/zh/guide/intro' },
            { text: '快速开始', link: '/zh/guide/quick-start' }
          ]
        },
        {
          text: '主题',
          items: [
            { text: '简介', link: '/zh/guide/theme/intro' },
            { text: '配置', link: '/zh/guide/theme/config' },
            { text: 'UnoCSS 主题', link: '/zh/guide/theme/unocss' }
          ]
        },
        {
          text: '图标',
          items: [
            { text: '简介', link: '/zh/guide/icon/intro' },
            { text: '使用方式', link: '/zh/guide/icon/usage' }
          ]
        },
        {
          text: '路由',
          items: [
            { text: '简介', link: '/zh/guide/router/intro' },
            { text: '路由结构', link: '/zh/guide/router/structure' },
            { text: '创建路由', link: '/zh/guide/router/create' },
            { text: '动态路由', link: '/zh/guide/router/dynamic' },
            { text: '路由缓存', link: '/zh/guide/router/cache' },
            { text: '路由组件', link: '/zh/guide/router/component' },
            { text: '路由跳转', link: '/zh/guide/router/push' },
            { text: '路由守卫', link: '/zh/guide/router/guard' }
          ]
        },
        {
          text: '请求',
          items: [
            { text: '简介', link: '/zh/guide/request/intro' },
            { text: '使用方式', link: '/zh/guide/request/usage' },
            { text: '代理', link: '/zh/guide/request/proxy' },
            { text: '对接后端', link: '/zh/guide/request/backend' }
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useTable', link: '/zh/guide/hooks/use-table' }
          ]
        }
      ],
      '/zh/backend/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/zh/backend/intro' },
            { text: '架构', link: '/zh/backend/architecture' }
          ]
        },
        {
          text: '核心',
          items: [
            { text: '数据模型', link: '/zh/backend/models' },
            { text: 'API 路由', link: '/zh/backend/api' },
            { text: '认证与权限', link: '/zh/backend/auth' },
            { text: 'CRUD 基类', link: '/zh/backend/crud' },
            { text: '响应码', link: '/zh/backend/codes' }
          ]
        },
        {
          text: '运维',
          items: [
            { text: '配置', link: '/zh/backend/config' },
            { text: '部署', link: '/zh/backend/deployment' }
          ]
        }
      ],
      '/zh/standard/': [
        { text: '概述', link: '/zh/standard/' },
        { text: '命名规范', link: '/zh/standard/naming' },
        { text: 'Vue 书写风格', link: '/zh/standard/vue' },
        { text: '后端风格', link: '/zh/standard/backend' }
      ],
      '/zh/faq/': [
        { text: '常见问题', link: '/zh/faq/' }
      ]
    }
  }
};

export default zhConfig;
