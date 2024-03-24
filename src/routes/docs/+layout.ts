import type { DocuCategory } from '$lib/types';
import type { LayoutLoad, LayoutLoadEvent } from './$types';

export const prerender = true

export const load: LayoutLoad = async ({fetch }: LayoutLoadEvent) => {
	
	const response = await fetch('/docs/api/categories');
    const docuCategories: DocuCategory[] = await response.json();

	const post = await import('../../docs/introduction.md')

	return {
		categories: docuCategories,
		content: post.default,
		meta: post.metadata
	};
};
