---
title: Filtering
description: Discover the flexibility and power of custom filtering in GridCraft data grid tables. Learn how to implement custom filters tailored to your specific requirements, enabling precise data analysis and manipulation in your SvelteKit applications.
date: '2024-3-21'
category: Features
order: 6
categoryOrder: 3
published: true
---
<script lang="ts">
    import Step from "$lib/components/docu/Step.svelte"
</script>

## How to Implement Custom Filters

To implement custom filters in GridCraft, follow these steps:

<Step number=1 title="Import the Necessary Types">
Begin by importing the `Grid` component and the `GridFilter` type from the GridCraft package.

```typescript
import { Grid, type GridFilter } from "@mediakular/gridcraft";
```
</Step>

<Step number=2 title="Define Reactive Filters">
Define a reactive variable to hold all filters. This variable will be updated as filters are applied or removed.

```typescript
let filters: GridFilter[];
$: filters = [ /* Define all filters here */ ];
```
</Step>

<Step number=3 title="Bind Filters to Grid">
Bind the `filters` variable to the `filters` property of the `Grid` component.

```svelte
<Grid 
    bind:data={clients} 
    ...
    bind:filters />
```
</Step>

<Step number=4 title="Define Filter Functions">
Define custom filter functions for each filter. These functions determine which rows should be displayed based on the filter criteria.

```typescript
$: filters = [
    {
        key: "my-filter",
        columns: ["column1", "column2"],
        filter: (row: any, colKey: string) => { 
            // Filter logic here
            // return true/false
        }, 
        active: true // Set to true to activate the filter, false to ignore
    }
]
```
</Step>

## Example Filters

### Text Filter

Implement a filter that filters all data entries by entered search term.

```svelte
<script>
    import { Grid, type GridFilter } from "@mediakular/gridcraft";

    interface Client {
        id: string;
        firstname: string;
        lastname: string;
        age: number;
    }

    export let data: PageData;
    let clients: Client[] = data.clients;
    
    let textSearch = "";
    
    let filters: GridFilter[];
    $: filters = [
        // Define text search filter
        {
            key: "text-search",
            columns: ["firstname", "lastname", "age"],
            filter: (row: any, colKey: string) => { 
                const search = (val: string | null) => val != undefined && val.toString().toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());
                return search(row)
            }, 
            active: (textSearch && textSearch.length > 0) ? true : false
        }
    ];
</script>

<!-- Text Search Input -->
<input type="text" placeholder="Enter Filter Term (Firstname, Lastname, or Age)" bind:value={textSearch} />

<Grid 
    bind:data={clients} 
    bind:filters />
```

### Checkbox Filter

Implement a filter that allows users to filter data based on checkbox selections.

```svelte
<script>
    import { Grid, type GridFilter } from "@mediakular/gridcraft";

    interface Client {
        //...
        status: 'active' | 'inactive' | 'pending'; 
    }

    export let data: PageData;
    let clients: Client[] = data.clients;

    let filters: GridFilter[];
    $: filters = [
        // Define checkbox filters
        { key: "status-active", columns: "status", filter: (val: any) => { return val != "active" }, active: false },
        { key: "status-inactive", columns: "status", filter: (val: any) => { return val != "inactive" }, active: false },
        { key: "status-pending", columns: "status", filter: (val: any) => { return val != "pending" }, active: false },
    ];
    
    // in this case we need to negate the value
    $: activeFilterActive = !filters[0].active;
    $: inactiveFilterActive = !filters[1].active;
    $: pendingFilterActive = !filters[2].active;
</script>

<!-- Checkbox Inputs -->
<label for="status-active">
    <input type="checkbox" bind:checked={activeFilterActive} on:click={() => filters[0].active = !filters[0].active} id="status-active">
    Active
</label>
<label for="status-inactive">
    <input type="checkbox" bind:checked={inactiveFilterActive} on:click={() => filters[1].active = !filters[1].active} id="status-inactive">
    Inactive
</label>
<label for="status-pending">
    <input type="checkbox" bind:checked={pendingFilterActive} on:click={() => filters[2].active = !filters[2].active} id="status-pending">
    Pending
</label>

<Grid 
    bind:data={clients} 
    bind:filters />
```