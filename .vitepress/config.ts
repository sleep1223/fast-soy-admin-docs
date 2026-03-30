import { defineConfig } from 'vitepress';
import zh from './locales/zh.js';

export default defineConfig({
  base: '/fast-soy-admin-docs/',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      dir: 'src/en',
      title: 'FastSoyAdmin',
      description: 'A full-stack admin template with FastAPI and Vue3'
    },
    zh
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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
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
      message: 'Published under the MIT license',
      copyright: 'Copyright © 2024 sleep1223'
    },
    nav: [
      { text: 'Guide', link: '/guide/intro', activeMatch: '/guide/' },
      { text: 'Backend', link: '/backend/intro', activeMatch: '/backend/' },
      { text: 'Standard', link: '/standard/', activeMatch: '/standard/' },
      { text: 'FAQ', link: '/faq/', activeMatch: '/faq/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Preview',
            link: 'https://fast-soy-admin.sleep0.de/'
          },
          {
            text: 'API Docs (Apifox)',
            link: 'https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b'
          },
          {
            text: 'SoybeanAdmin',
            link: 'https://github.com/soybeanjs/soybean-admin'
          },
          {
            text: 'SoybeanAdmin Docs',
            link: 'https://docs.soybeanjs.cn'
          },
          {
            text: 'FastAPI',
            link: 'https://fastapi.tiangolo.com/'
          },
          {
            text: 'Tortoise ORM',
            link: 'https://tortoise.github.io'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/intro' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        },
        {
          text: 'Theme',
          items: [
            { text: 'Introduction', link: '/guide/theme/intro' },
            { text: 'Config', link: '/guide/theme/config' },
            { text: 'UnoCSS Theme', link: '/guide/theme/unocss' }
          ]
        },
        {
          text: 'Icon',
          items: [
            { text: 'Introduction', link: '/guide/icon/intro' },
            { text: 'Usage', link: '/guide/icon/usage' }
          ]
        },
        {
          text: 'Router',
          items: [
            { text: 'Introduction', link: '/guide/router/intro' },
            { text: 'Route Structure', link: '/guide/router/structure' },
            { text: 'Route Creation', link: '/guide/router/create' },
            { text: 'Dynamic Route', link: '/guide/router/dynamic' },
            { text: 'Route Cache', link: '/guide/router/cache' },
            { text: 'Route Component', link: '/guide/router/component' },
            { text: 'Router Push', link: '/guide/router/push' },
            { text: 'Router Guard', link: '/guide/router/guard' }
          ]
        },
        {
          text: 'Request',
          items: [
            { text: 'Introduction', link: '/guide/request/intro' },
            { text: 'Usage', link: '/guide/request/usage' },
            { text: 'Proxy', link: '/guide/request/proxy' },
            { text: 'Connect Backend', link: '/guide/request/backend' }
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
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/backend/intro' },
            { text: 'Architecture', link: '/backend/architecture' }
          ]
        },
        {
          text: 'Core',
          items: [
            { text: 'Models', link: '/backend/models' },
            { text: 'API Routes', link: '/backend/api' },
            { text: 'Auth & RBAC', link: '/backend/auth' },
            { text: 'CRUD Base', link: '/backend/crud' },
            { text: 'Response Codes', link: '/backend/codes' }
          ]
        },
        {
          text: 'Operations',
          items: [
            { text: 'Configuration', link: '/backend/config' },
            { text: 'Deployment', link: '/backend/deployment' }
          ]
        }
      ],
      '/standard/': [
        { text: 'Overview', link: '/standard/' },
        { text: 'Naming', link: '/standard/naming' },
        { text: 'Vue Writing Style', link: '/standard/vue' },
        { text: 'Backend Style', link: '/standard/backend' }
      ],
      '/faq/': [
        { text: 'FAQ', link: '/faq/' }
      ]
    }
  }
});
