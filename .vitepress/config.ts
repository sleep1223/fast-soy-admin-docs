import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';
import en from './locales/en.js';

const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaSearchKey = process.env.ALGOLIA_SEARCH_API_KEY;
const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME;
const algoliaAssistantId = process.env.ALGOLIA_ASSISTANT_ID;

const search: DefaultTheme.Config['search'] = algoliaAppId && algoliaSearchKey && algoliaIndexName
  ? {
      provider: 'algolia',
      options: {
        appId: algoliaAppId,
        apiKey: algoliaSearchKey,
        indexName: algoliaIndexName,
        ...(algoliaAssistantId
          ? {
              mode: 'hybrid' as const,
              askAi: {
                assistantId: algoliaAssistantId,
                sidePanel: true
              }
            }
          : {}),
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            },
            searchParameters: {
              facetFilters: ['lang:zh']
            }
          },
          en: {
            placeholder: 'Search docs',
            searchParameters: {
              facetFilters: ['lang:en']
            }
          }
        }
      }
    }
  : undefined;

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
  // 文档里大量引用 app/ 与 web/ 下的源码路径作为相对链接，
  // 这些链接在 GitHub 视图下能跳转，但 VitePress 看不到对应 .md/.html。
  // 用正则放行这类源码路径的 dead link 检查。
  ignoreDeadLinks: [
    /\.\.\/(\.\.\/)+(app|web|tortoise-orm|migrations|deploy|tests)\//
  ],
  themeConfig: {
    logo: '/logo.svg',
    ...(search ? { search } : {}),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sleep1223/fast-soy-admin' }
    ],
    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2024 sleep1223'
    },
    nav: [
      { text: '指南', link: '/guide/intro', activeMatch: '/guide/' },
      { text: '前端', link: '/frontend/intro', activeMatch: '/frontend/' },
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
        }
      ],
      '/frontend/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/frontend/intro' }
          ]
        },
        {
          text: '路由',
          items: [
            { text: '简介', link: '/frontend/router/intro' },
            { text: '路由结构', link: '/frontend/router/structure' },
            { text: '创建路由', link: '/frontend/router/create' },
            { text: '动态路由', link: '/frontend/router/dynamic' },
            { text: '路由缓存', link: '/frontend/router/cache' },
            { text: '路由组件', link: '/frontend/router/component' },
            { text: '路由跳转', link: '/frontend/router/push' },
            { text: '路由守卫', link: '/frontend/router/guard' }
          ]
        },
        {
          text: '请求',
          items: [
            { text: '简介', link: '/frontend/request/intro' },
            { text: '使用方式', link: '/frontend/request/usage' },
            { text: '代理', link: '/frontend/request/proxy' },
            { text: '对接后端', link: '/frontend/request/backend' }
          ]
        },
        {
          text: '主题',
          items: [
            { text: '简介', link: '/frontend/theme/intro' },
            { text: '配置', link: '/frontend/theme/config' },
            { text: 'UnoCSS 主题', link: '/frontend/theme/unocss' }
          ]
        },
        {
          text: '图标',
          items: [
            { text: '简介', link: '/frontend/icon/intro' },
            { text: '使用方式', link: '/frontend/icon/usage' }
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useTable', link: '/frontend/hooks/use-table' }
          ]
        }
      ],
      '/backend/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/backend/intro' },
            { text: '架构', link: '/backend/architecture' },
            { text: '命令参考', link: '/backend/commands' },
            { text: '开发指南', link: '/backend/development' }
          ]
        },
        {
          text: '路由 / Schema',
          items: [
            { text: 'API 约定', link: '/backend/api' },
            { text: 'CRUDRouter', link: '/backend/crud-router' },
            { text: 'CRUDBase', link: '/backend/crud' },
            { text: 'Schema 基类', link: '/backend/schema' },
            { text: '响应码', link: '/backend/codes' },
            { text: 'app.utils 入口', link: '/backend/utils' }
          ]
        },
        {
          text: '核心机制',
          items: [
            { text: '自动发现', link: '/backend/core/autodiscover' },
            { text: '启动初始化与对账', link: '/backend/init-data' },
            { text: '资源 ID（Sqids）', link: '/backend/core/sqids' },
            { text: '事件总线', link: '/backend/core/events' },
            { text: '状态机', link: '/backend/core/state-machine' }
          ]
        },
        {
          text: '数据',
          items: [
            { text: '数据模型（System）', link: '/backend/models' },
            { text: '模型 Mixin', link: '/backend/mixins' },
            { text: '切换数据库', link: '/backend/database' },
            { text: '缓存', link: '/backend/cache' },
            { text: '高并发业务', link: '/backend/concurrency' }
          ]
        },
        {
          text: '认证与权限',
          items: [
            { text: '认证（JWT / token_version）', link: '/backend/auth' },
            { text: 'RBAC（菜单/API/按钮）', link: '/backend/rbac' },
            { text: '数据权限（data_scope）', link: '/backend/data-scope' }
          ]
        },
        {
          text: '业务模块',
          items: [
            { text: 'HR 管理（参考样例）', link: '/backend/business/hr' }
          ]
        },
        {
          text: '运维',
          items: [
            { text: '配置', link: '/backend/config' },
            { text: '部署', link: '/backend/deployment' },
            { text: '监控（Radar / Guard）', link: '/backend/radar' }
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
