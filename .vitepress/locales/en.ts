import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: 'English',
  lang: 'en',
  dir: 'src/en',
  title: 'FastSoyAdmin',
  description: 'A full-stack admin template with FastAPI and Vue3',
  themeConfig: {
    nav: [
      { text: 'Getting Started', link: '/en/getting-started/intro', activeMatch: '/en/getting-started/' },
      { text: 'Backend Dev', link: '/en/develop/intro', activeMatch: '/en/develop/' },
      { text: 'Frontend', link: '/en/frontend/intro', activeMatch: '/en/frontend/' },
      { text: 'Operations', link: '/en/ops/deployment', activeMatch: '/en/ops/' },
      { text: 'Reference', link: '/en/reference/commands', activeMatch: '/en/reference/' },
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
      '/en/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/getting-started/intro' },
            { text: 'Quick Start', link: '/en/getting-started/quick-start' },
            { text: 'Architecture', link: '/en/getting-started/architecture' },
            { text: 'Development Workflow', link: '/en/getting-started/workflow' }
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
      '/en/develop/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/develop/intro' }
          ]
        },
        {
          text: 'Routing / Schema',
          items: [
            { text: 'API Conventions', link: '/en/develop/api' },
            { text: 'CRUDRouter', link: '/en/develop/crud-router' },
            { text: 'CRUDBase', link: '/en/develop/crud' },
            { text: 'Schema Base', link: '/en/develop/schema' }
          ]
        },
        {
          text: 'Core Mechanisms',
          items: [
            { text: 'Autodiscover', link: '/en/develop/autodiscover' },
            { text: 'Startup Init & Reconciliation', link: '/en/develop/init-data' },
            { text: 'Resource IDs (Sqids)', link: '/en/develop/sqids' },
            { text: 'Event Bus', link: '/en/develop/events' },
            { text: 'State Machine', link: '/en/develop/state-machine' }
          ]
        },
        {
          text: 'Data',
          items: [
            { text: 'Data Models (System)', link: '/en/develop/models' },
            { text: 'Model Mixins', link: '/en/develop/mixins' }
          ]
        },
        {
          text: 'Auth & Permissions',
          items: [
            { text: 'Authentication (JWT / token_version)', link: '/en/develop/auth' },
            { text: 'RBAC (menu/api/button)', link: '/en/develop/rbac' },
            { text: 'Data Scope', link: '/en/develop/data-scope' }
          ]
        },
        {
          text: 'Business Modules',
          items: [
            { text: 'HR (reference)', link: '/en/develop/business-hr' }
          ]
        }
      ],
      '/en/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Commands (Makefile)', link: '/en/reference/commands' },
            { text: 'Response Codes', link: '/en/reference/codes' },
            { text: 'app.utils Facade', link: '/en/reference/utils' }
          ]
        }
      ],
      '/en/ops/': [
        {
          text: 'Operations',
          items: [
            { text: 'Configuration', link: '/en/ops/config' },
            { text: 'Deployment', link: '/en/ops/deployment' },
            { text: 'Switching Database', link: '/en/ops/database' },
            { text: 'Cache', link: '/en/ops/cache' },
            { text: 'Monitoring (Radar / Guard)', link: '/en/ops/radar' }
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
