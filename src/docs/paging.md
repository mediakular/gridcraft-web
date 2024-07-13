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
import { Grid, GridFooter, type PagingData } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Modify Paging Variables (optional)">

Optionally, modify the paging variables such as `itemsPerPage`, `currentPage`, or `itemsPerPageOptions`.

```typescript
let paging = {
    itemsPerPage: 20,
    currentPage: 2,
    itemsPerPageOptions: [10, 20, 50]
} as PagingData;
```
</Step>

<Step number=3 title="Use GridFooter Component">

Include the `GridFooter` component one or multiple times and assign the paging property:

```svelte
<Grid bind:data={clients} {paging}/>

<GridFooter bind:paging />
```
</Step>

<Step number=4 title="Done!">

That's it! Now you have implemented simple pagination in your GridCraft data table.


!> In case you only want to change the paging buttons you can change the theme for the `Paging` component, as the `GridFooter` uses the `Paging` component! Learn more about theming in the [theming section](/docs/theming).
</Step>

<DocuGrid itemCount={50} columns=[firstname,lastname,age,status] showFooter={true} itemsPerPage={5} itemsPerPageOptions={[5,10]}></DocuGrid>


## Customized Pagination

To implement customized pagination in GridCraft, follow these steps:


<Step number=1 title="Define Paging Component">

Create a new component ´MyPaging.svelte´ and define the functions and markup for navigating to the next and previous pages:

```svelte
<script>
import { type PagingData } from "@mediakular/gridcraft";

export let paging: PagingData; 

let itemsPerPage = 10;

function nextPage() {
    paging.currentPage += 1;
}

function prevPage() {
    paging.currentPage -= 1;
}

function handleItemsPerPageChange() {
    paging.itemsPerPage = itemsPerPage;
}
</script>

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


<Step number=2 title="Use Custom Paging Component">

Import the Grid component from @mediakular/gridcraft:

```svelte
<script>
import { Grid, type PagingData } from "@mediakular/gridcraft";
import MyPaging from "$lib/components/MyPaging.svelte";

let data = [
    // your data
];

let paging = {
    itemsPerPage: 20,
    currentPage: 2,
    itemsPerPageOptions: [10, 20, 50]
} as PagingData;

</script>

<MyPaging bind:paging />

<Grid {data} {paging} />

<MyPaging bind:paging />

```
</Step>


<Step number=3 title="Done!">
That's it! You've successfully implemented a customized pagination in your GridCraft data table.
</Step>



Example for paging with page number buttons: 

[![Open in SvelteLab](https://docs.sveltelab.dev/button/dark_short.svg)](https://sveltelab.dev/97vvmq174sei27p)