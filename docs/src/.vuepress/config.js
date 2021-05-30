let title = 'WarpURL API Documentation';
let description = title;
// const image = path.resolve(__dirname + '/static/logo_back_white.svg');
let image = 'https://warpurl.com/cdn/logos/logo_back_white.png';

let ogTagsFromWarpUrlWeb = [
  { hid: 'twitter:title', name: 'twitter:title', content: title },
  { hid: 'twitter:description', name: 'twitter:description', content: description },
  { hid: 'twitter:image', name: 'twitter:image', content: image },
  { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title },
  { hid: 'og:title', property: 'og:title', content: title },
  { hid: 'og:site_name', property: 'og:site_name', content: title },
  { hid: 'og:description', property: 'og:description', content: description },
  { hid: 'og:image', property: 'og:image', content: image },
  { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: image },
  { hid: 'og:image:alt', property: 'og:image:alt', content: title }
];

let ogTagsTransformed = ogTagsFromWarpUrlWeb.map(row => {
  return ['meta', row ];
})

module.exports = {
  title: title,
  description: description,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' }],
    ['meta', { name: 'robots', content: 'noindex,nofollow' }],
    ['meta', { name: 'author', content: 'Rehan van der Merwe' }],
    ...ogTagsTransformed,
    ['meta', { name: 'theme-color', content: '#2a7bff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png' }]
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
