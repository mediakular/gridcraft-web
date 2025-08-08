import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeSlug from 'rehype-slug'
import remarkHint from 'remark-hint'
import remarkCodeTitle from 'remark-code-title'
import { mdsvex, escapeSvelte } from 'mdsvex'
import { getSingletonHighlighter } from 'shiki'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkUnwrapImages, remarkHint, remarkCodeTitle],
	rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, [rehypeToc, { headings: ["h2", "h3"] }]],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const theme = "dark-plus";
			const highlighter = await getSingletonHighlighter({
				themes: [theme],
				langs: ['javascript', 'typescript', 'svelte', 'bash', 'css']
			})
			await highlighter.loadLanguage('javascript', 'typescript', 'svelte', 'bash', 'css')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }))
			return `{@html \`${html}\` }`
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.md'],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true,
			trailingSlash: 'ignore'
		})
	}
};

export default config;
