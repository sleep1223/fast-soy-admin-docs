import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: 'English',
  lang: 'en',
  dir: 'src/en',
  title: 'FastSoyAdmin',
  description: 'A full-stack admin template with FastAPI and Vue3',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/en/guide/intro', activeMatch: '/en/guide/' },
      { text: 'Frontend', link: '/en/frontend/intro', activeMatch: '/en/frontend/' },
      { text: 'Backend', link: '/en/backend/intro', activeMatch: '/en/backend/' },
      { text: 'Standard', link: '/en/standard/', activeMatch: '/en/standard/' },
      { text: 'FAQ', link: '/en/faq/', activeMatch: '/en/faq/' },
      {
        text: 'Links',
        items: [
          { text: 'Preview', link: 'https://fast-soy-admin.sleep0.de/' },
          { text: 'API Docs (Apidog)', link: 'https://fast-soy-admin.apidog.io' },
          { text: 'SoybeanAdmin', link: 'https://github.com/soybeanjs/soybean-admin' },
          { text: 'SoybeanAdmin Docs', link: 'https://docs.soybeanjs.cn' },
          { text: 'FastAPI', link: 'https://fastapi.tiangolo.com/' },
          { text: 'Tortoise ORM', link: 'https://tortoise.github.io' }
        ]
      }
    ],
    sidebar: {
      '/en/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/guide/intro' },
            { text: 'Quick Start', link: '/en/guide/quick-start' }
          ]
        }
      ],
      '/en/frontend/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/frontend/intro' }
          ]
        },
        {
          text: 'Router',
          items: [
            { text: 'Introduction', link: '/en/frontend/router/intro' },
            { text: 'Route Structure', link: '/en/frontend/router/structure' },
            { text: 'Route Creation', link: '/en/frontend/router/create' },
            { text: 'Dynamic Route', link: '/en/frontend/router/dynamic' },
            { text: 'Route Cache', link: '/en/frontend/router/cache' },
            { text: 'Route Component', link: '/en/frontend/router/component' },
            { text: 'Router Push', link: '/en/frontend/router/push' },
            { text: 'Router Guard', link: '/en/frontend/router/guard' }
          ]
        },
        {
          text: 'Request',
          items: [
            { text: 'Introduction', link: '/en/frontend/request/intro' },
            { text: 'Usage', link: '/en/frontend/request/usage' },
            { text: 'Proxy', link: '/en/frontend/request/proxy' },
            { text: 'Connect Backend', link: '/en/frontend/request/backend' }
          ]
        },
        {
          text: 'Theme',
          items: [
            { text: 'Introduction', link: '/en/frontend/theme/intro' },
            { text: 'Config', link: '/en/frontend/theme/config' },
            { text: 'UnoCSS Theme', link: '/en/frontend/theme/unocss' }
          ]
        },
        {
          text: 'Icon',
          items: [
            { text: 'Introduction', link: '/en/frontend/icon/intro' },
            { text: 'Usage', link: '/en/frontend/icon/usage' }
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useTable', link: '/en/frontend/hooks/use-table' }
          ]
        }
      ],
      '/en/backend/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/backend/intro' },
            { text: 'Architecture', link: '/en/backend/architecture' },
            { text: 'Commands', link: '/en/backend/commands' },
            { text: 'Development Guide', link: '/en/backend/development' }
          ]
        },
        {
          text: 'Routing / Schema',
          items: [
            { text: 'API Conventions', link: '/en/backend/api' },
            { text: 'CRUDRouter', link: '/en/backend/crud-router' },
            { text: 'CRUDBase', link: '/en/backend/crud' },
            { text: 'Schema Base', link: '/en/backend/schema' },
            { text: 'Response Codes', link: '/en/backend/codes' },
            { text: 'app.utils Facade', link: '/en/backend/utils' }
          ]
        },
        {
          text: 'Core Mechanisms',
          items: [
            { text: 'Autodiscover', link: '/en/backend/core/autodiscover' },
            { text: 'Startup Init & Reconciliation', link: '/en/backend/init-data' },
            { text: 'Resource IDs (Sqids)', link: '/en/backend/core/sqids' },
            { text: 'Event Bus', link: '/en/backend/core/events' },
            { text: 'State Machine', link: '/en/backend/core/state-machine' }
          ]
        },
        {
          text: 'Data',
          items: [
            { text: 'Data Models (System)', link: '/en/backend/models' },
            { text: 'Model Mixins', link: '/en/backend/mixins' },
            { text: 'Switching Database', link: '/en/backend/database' },
            { text: 'Cache', link: '/en/backend/cache' }
          ]
        },
        {
          text: 'Auth & Permissions',
          items: [
            { text: 'Authentication (JWT / token_version)', link: '/en/backend/auth' },
            { text: 'RBAC (menu/api/button)', link: '/en/backend/rbac' },
            { text: 'Data Scope', link: '/en/backend/data-scope' }
          ]
        },
        {
          text: 'Business Modules',
          items: [
            { text: 'HR (reference)', link: '/en/backend/business/hr' }
          ]
        },
        {
          text: 'Operations',
          items: [
            { text: 'Configuration', link: '/en/backend/config' },
            { text: 'Deployment', link: '/en/backend/deployment' },
            { text: 'Monitoring (Radar / Guard)', link: '/en/backend/radar' }
          ]
        }
      ],
      '/en/standard/': [
        { text: 'Overview', link: '/en/standard/' },
        { text: 'Naming', link: '/en/standard/naming' },
        { text: 'Vue Writing Style', link: '/en/standard/vue' },
        { text: 'Backend Style', link: '/en/standard/backend' }
      ],
      '/en/faq/': [
        { text: 'FAQ', link: '/en/faq/' }
      ]
    }
  }
};

export default enConfig;
