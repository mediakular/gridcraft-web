export type DocuCategory = {
    title: string,
    order: number,
    pages: DocuFile[]
}

export type DocuFile = {
    title: string,
    description: string,
    date: string,
    order: number,
    category: string,
    categoryOrder: number,
    published: boolean,
    slug: string,
}