---
title: Data Stores API
description: Learn how to efficiently manage and manipulate data with GridCraft's Data Stores API. Dive into the documentation to discover powerful methods for handling data within your SvelteKit applications.
date: '2024-4-08'
category: API
order: 1
categoryOrder: 5
published: true
---

## Paging Store

The Paging Store contains an object for managing paging data, empowering developers to craft custom paging components tailored to their applications' needs.

### Object Structure

```typescript
export type PagingData = {
    currentPage: number;
    itemsPerPage: number;
    itemsPerPageOptions: number[];
    totalPages: number;
    totalResults: number;
}
```

### Using the store

```svelte
<script>
    import { Grid, PagingStore, type PagingData } from "@mediakular/gridcraft";
    ...
    PagingStore.set({
        itemsPerPage: 5,
        currentPage: 2, // default page will be 2, if availabe
        itemsPerPageOptions: [5, 10, 20]
    } as PagingData);
</script>
```

## Theme Store

The Theme Store enables dynamic theme management by accepting objects of type `GridTheme`. 

Set themes by using the theme store: 

```svelte
<script>
    import { Grid, ThemeStore, PrelineTheme } from "@mediakular/gridcraft";
    ...
    ThemeStore.set(PrelineTheme);
</script>
```

### Theme Structure

If you want to change certain parts of your chosen theme or you want to create your own theme you can refer to the following `GridTheme` type:

```typescript
export type GridTheme = {
    grid: {
        container: ComponentType;
        header: {
            container: ComponentType,
            row: ComponentType,
            content: ComponentType,
            checkbox: ComponentType,
            sortIndicator: ComponentType,
        },
        groupby: {
            container: ComponentType,
            checkbox: ComponentType,
            cell: ComponentType,
            content: ComponentType,
            rowsCount: ComponentType,
        },
        body: {
            container: ComponentType,
            row: ComponentType,
            cell: ComponentType,
            checkbox: ComponentType,
            content: ComponentType
        }
    }
    footer: ComponentType;
    paging: ComponentType;
}
```
