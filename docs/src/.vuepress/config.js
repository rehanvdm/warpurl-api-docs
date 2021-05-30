const { description } = require('../../package')

module.exports = {
  title: '',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    logo: '/logo_back_white.svg',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebarDepth: 2,
    nav: [
      {
        text: 'API',
        link: '/api/',
      },
      {
        text: 'WarpURL',
        link: 'https://warpurl.com'
      }
    ],
    sidebar: {
      '/api/': [
        {
          title: 'Api',
          collapsable: false,
          children: [
            '',
            'model',
            {
              title: 'REQUESTS',
              // prefix: '/requests/', //not really working
              // path: '/api/requests/', //no path makes it a group
              collapsable: false,
              sidebarDepth: 1,
              children: [
                  'link',
                  'campaign',
                  'db_import',
                  'access_key',
                  'user',
                  'client'
              ]
            },
          ]
        }
      ],

      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
