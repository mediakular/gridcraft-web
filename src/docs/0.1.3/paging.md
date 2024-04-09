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
import { Grid, GridFooter } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Define Paging Variables">

Define the paging variables such as `itemsPerPage`, `currentPage`, `totalPages`, `totalResults`, and optionally `itemsPerPageOptions`:

```typescript
let itemsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
let totalResults = 0;
let itemsPerPageOptions = [10, 20, 50, 100]; //optional, default values
```
</Step>

<Step number=2 title="Set Properties">

Set these variables in the `Grid` component and the referenced `GridFooter` component:

```svelte
<Grid 
    bind:data={clients} 
    bind:currentPage 
    bind:itemsPerPage 
    bind:totalPages 
    bind:totalResults />

<GridFooter 
    bind:currentPage 
    bind:totalPages 
    bind:totalResults 
    bind:itemsPerPage 
    bind:itemsPerPageOptions />
```
</Step>

<Step number=3 title="Done!">

That's it! Now you have implemented simple pagination in your GridCraft data table.


!> In case you only want to change the paging buttons you can change the theme for the `Paging` component, as the `GridFooter` uses the `Paging` component! Learn more about theming in the theming section.
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

<Step number=2 title="Define Necessary Variables">

Define the paging variables such as `itemsPerPage`, `totalPages`, `totalResults`, and `itemsPerPageOptions`, and the `currentPage` variable with reactive assignment:

```typescript
let itemsPerPage = 10;
let totalPages = 1;
let totalResults = 0;
let itemsPerPageOptions = [10, 20, 50, 100]; 

let currentPage = 1;
$: currentPage = Math.max(1, Math.min(currentPage, totalPages)); // this is currently necessesary to fix a bug and might be unnecessary in future versions
```

</Step>

<Step number=3 title="Define Paging Functions">

Define the functions for navigating to the next and previous pages:

```typescript
function nextPage() {
    if (currentPage < totalPages) {
        currentPage += 1;
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage -= 1;
    }
}
```
</Step>

<Step number=4 title="Set Variables And Implement Paging">

Set these variables in the Grid component and define your custom pagination in the markup:

```svelte
<Grid 
    bind:data={clients} 
    bind:currentPage 
    bind:itemsPerPage 
    bind:totalPages 
    bind:totalResults />

<div>
    <select bind:value={itemsPerPage}>
        {#each itemsPerPageOptions as option (option)}
            <option value="{option}" selected={option == itemsPerPage}>{option}</option>
        {/each}
    </select>

    Page <span>{currentPage}</span> of <span>{totalPages}</span>

    <button on:click={prevPage} type="button" disabled={currentPage == 1 ? true : false}>
        Previous
    </button>

    <button on:click={nextPage} type="button" disabled={currentPage < totalPages ? false : true}>
        Next
    </button>
</div>
```

</Step>

<Step number=5 title="Done!">
That's it! You have successfully implemented customized pagination and footer in your GridCraft data table.
</Step>