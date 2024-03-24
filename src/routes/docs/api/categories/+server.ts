import type { DocuCategory, DocuFile } from "$lib/types";
import { json } from "@sveltejs/kit";

export async function GET() {
    const cats = await getDocCategories();
    return json(cats);
}

async function getDocCategories() {
    const categories:DocuCategory[] = [];

    const paths = import.meta.glob('../../../../docs/*.md', { eager: true });

    for (const path in paths) {
		
        const file = paths[path];
        const slug = path.split('/').at(-1)?.replace('.md', '');
        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<DocuFile, 'slug'>;
            const docu = { ...metadata, slug } satisfies DocuFile;
            
            if (docu.published) {
                const cat = categories.find((category) => category.title === docu.category)
                cat 
                    ? cat.pages.push(docu) 
                    : categories.push({title: docu.category, pages: [docu], order: docu.categoryOrder})
            }
        }
    }

    categories.sort((first,next) => {
        if(first.order > next.order) { 
            return 1 
        } else if (first.order < next.order) { 
            return -1 
        } else {
            return 0
        }
    })

    for (const category of categories) {
        category.pages.sort((first,next) => {
            if(first.order > next.order) { 
                return 1 
            } else if (first.order < next.order) { 
                return -1 
            } else {
                return 0
            }
        })
    }

    return categories;
}
