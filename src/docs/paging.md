---
title: Paging
description: Learn how to implement pagination in your GridCraft data tables with ease. Explore various pagination options and configurations to enhance data navigation and organization in your SvelteKit applications.
date: '2024-3-21'
category: Features
order: 2
categoryOrder: 3
published: true
---
<script lang="ts">
    import Step from "$lib/components/docu/Step.svelte"
    import DocuGrid from "$lib/components/docu/DocuGrid.svelte"
</script>

## Pagination with Predefined Footer

To implement pagination using the predefined Footer Component in GridCraft, follow these steps:

<Step number=1 title="Import Grid and GridFooter Components">

Import the `Grid` and GridFooter components from `@mediakular/gridcraft`:
   
```typescript
import { Grid, GridFooter, PagingStore } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Modify Paging Variables (optional)">

Optionally, modify the paging variables such as `itemsPerPage`, `currentPage`, or `itemsPerPageOptions`.

```typescript
 PagingStore.set({
        itemsPerPage: 20,
        currentPage: 2,
        itemsPerPageOptions: [10, 20, 50]
    } as PagingData
);
```
</Step>

<Step number=3 title="Use GridFooter Component">

Include the `GridFooter` component one or multiple times:

```svelte
<Grid bind:data={clients} />

<GridFooter />
```
</Step>

<Step number=4 title="Done!">

That's it! Now you have implemented simple pagination in your GridCraft data table.


!> In case you only want to change the paging buttons you can change the theme for the `Paging` component, as the `GridFooter` uses the `Paging` component! Learn more about theming in the [theming section](/theming).
</Step>

<DocuGrid itemCount={50} columns=[firstname,lastname,age,status] showFooter={true} itemsPerPage={5} itemsPerPageOptions={[5,10]}></DocuGrid>


## Customized Pagination and Footer

To implement customized pagination and footer in GridCraft, follow these steps:

<Step number=1 title="Import Grid Component">

Import the Grid component from @mediakular/gridcraft:

```typescript
import { Grid } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Modify Paging Variables (Optional)">

Optionally, modify the default paging variables such as `itemsPerPage`, `currentPage`, or `itemsPerPageOptions`.

```typescript
 PagingStore.set({
        itemsPerPage: 20,
        currentPage: 2,
        itemsPerPageOptions: [10, 20, 50]
    } as PagingData
);
```

</Step>

<Step number=3 title="Define Paging Functions">

Create a new component ´MyPaging.svelte´ and define the functions for navigating to the next and previous pages:

```svelte
<script>
import { PagingStore, type PagingData} from "@mediakular/gridcraft";

$: paging = $PagingStore;

let itemsPerPage = 10;

function nextPage() {
    PagingStore.update((value:PagingData) => {
        return {
            ...value,
            currentPage: value.currentPage += 1
        };
    })
}

function prevPage() {
    PagingStore.update((value:PagingData) => {
        return {
            ...value,
            currentPage: value.currentPage -= 1
        };
    })
}

function handleItemsPerPageChange() {
    PagingStore.update((val) => {
        return {
            ...val,
            itemsPerPage: itemsPerPage
        }
    });
}
</script>
```
</Step>

<Step number=4 title="Implement Paging">

In the same component define your custom pagination in the markup:

```svelte
<div>
    <select bind:value={itemsPerPage} on:change={handleItemsPerPageChange}>
        {#each paging.itemsPerPageOptions as option (option)}
            <option value="{option}" selected={option == paging.itemsPerPage}>{option}</option>
        {/each}
    </select>

    Page <span>{paging.currentPage}</span> of <span>{paging.totalPages}</span>

    <button on:click={prevPage} type="button" disabled={paging.currentPage == 1 ? true : false}>
        Previous
    </button>

    <button on:click={nextPage} type="button" disabled={paging.currentPage < paging.totalPages ? false : true}>
        Next
    </button>
</div>
```

</Step>

<Step number=5 title="Done!">
Use your new component and that's it! You've successfully implemented customized pagination and footer in your GridCraft data table.
</Step>