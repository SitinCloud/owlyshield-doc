import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/reference/site-config
export default defineConfig({
	title: "Owlyshield Docs",
	description: "Documentation for Owlyshield",
	themeConfig: {
		// https://vitepress.vuejs.org/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Owlyshield', link: '/introduction' }
		],

		sidebar: [
			{
				text: 'Owlyshield',
				items: [
					{ text: 'Introduction', link: '/introduction'},
					{ text: 'Concepts', link: '/concepts'},
					{ text: 'Get Started', 
						items: [
							{ text: 'Install Owlyshield (Linux)', link: '/getting-started/install-linux' },
							{ text: 'Install Owlyshield (Windows)', link: '/getting-started/install-windows' }
						]
					},
					{ text: 'Build from Source',
						collapsed: true,
						items: [
							{ text: 'Windows Build', link: '/build/windows-build' },
							{ text: 'Linux Build', link: '/build/linux-build' },
						]
					}
				]
			}
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		]
	}
})
