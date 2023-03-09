import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/reference/site-config
export default defineConfig({
  title: "Owlyshield Docs",
  description: "Documentation for Owlyshield",
  themeConfig: {
    // https://vitepress.vuejs.org/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Owlyshield', link: '/owlyshield/index' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
	text: 'Owlyshield',
	items: [
	  { text: 'Get Started', link: '/owlyshield/index' }
	]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
