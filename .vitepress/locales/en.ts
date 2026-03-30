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
      { text: 'Backend', link: '/en/backend/intro', activeMatch: '/en/backend/' },
      { text: 'Standard', link: '/en/standard/', activeMatch: '/en/standard/' },
      { text: 'FAQ', link: '/en/faq/', activeMatch: '/en/faq/' },
      {
        text: 'Links',
        items: [
          { text: 'Preview', link: 'https://fast-soy-admin.sleep0.de/' },
          { text: 'API Docs (Apifox)', link: 'https://apifox.com/apidoc/shared-7cd78102-46eb-4701-88b1-3b49c006504b' },
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
        },
        {
          text: 'Theme',
          items: [
            { text: 'Introduction', link: '/en/guide/theme/intro' },
            { text: 'Config', link: '/en/guide/theme/config' },
            { text: 'UnoCSS Theme', link: '/en/guide/theme/unocss' }
          ]
        },
        {
          text: 'Icon',
          items: [
            { text: 'Introduction', link: '/en/guide/icon/intro' },
            { text: 'Usage', link: '/en/guide/icon/usage' }
          ]
        },
        {
          text: 'Router',
          items: [
            { text: 'Introduction', link: '/en/guide/router/intro' },
            { text: 'Route Structure', link: '/en/guide/router/structure' },
            { text: 'Route Creation', link: '/en/guide/router/create' },
            { text: 'Dynamic Route', link: '/en/guide/router/dynamic' },
            { text: 'Route Cache', link: '/en/guide/router/cache' },
            { text: 'Route Component', link: '/en/guide/router/component' },
            { text: 'Router Push', link: '/en/guide/router/push' },
            { text: 'Router Guard', link: '/en/guide/router/guard' }
          ]
        },
        {
          text: 'Request',
          items: [
            { text: 'Introduction', link: '/en/guide/request/intro' },
            { text: 'Usage', link: '/en/guide/request/usage' },
            { text: 'Proxy', link: '/en/guide/request/proxy' },
            { text: 'Connect Backend', link: '/en/guide/request/backend' }
          ]
        },
        {
          text: 'Hooks',
          items: [
            { text: 'useTable', link: '/en/guide/hooks/use-table' }
          ]
        }
      ],
      '/en/backend/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/backend/intro' },
            { text: 'Architecture', link: '/en/backend/architecture' }
          ]
        },
        {
          text: 'Core',
          items: [
            { text: 'Models', link: '/en/backend/models' },
            { text: 'API Routes', link: '/en/backend/api' },
            { text: 'Auth & RBAC', link: '/en/backend/auth' },
            { text: 'CRUD Base', link: '/en/backend/crud' },
            { text: 'Response Codes', link: '/en/backend/codes' }
          ]
        },
        {
          text: 'Operations',
          items: [
            { text: 'Configuration', link: '/en/backend/config' },
            { text: 'Deployment', link: '/en/backend/deployment' }
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
