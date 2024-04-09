---
title: Row Selection
description: Discover how to enable and configure row selection in your GridCraft data grid table. Empower users to interact with and manipulate data by selecting individual rows in your SvelteKit applications.
date: '2024-3-22'
category: Features
order: 4
categoryOrder: 3
published: true
---

<script lang="ts">
    import Step from "$lib/components/docu/Step.svelte";
    import DocuGrid from "$lib/components/docu/DocuGrid.svelte"

</script>


<DocuGrid itemCount={5} columns=[firstname,lastname,age,status] itemsPerPage="5" showCheckboxes="true" showCheckedDebug="true"></DocuGrid>


## Enabling Row Selection

To enable row selection in your GridCraft data grid table, follow these steps:

<Step number=1>
Set the `showCheckboxes` property to `true` in the `Grid` component.

```svelte
<Grid 
    bind:data={clients} 
    ...
    showCheckboxes="true" />
```
</Step>

<Step number=2>
Bind a variable to the `selectedRows` property of the Grid component. This variable needs to be an array of the same type as your data. It will be containing all rows selected by the user.

```svelte
<script>
    let mySelectedRows: Client[] = [];
</script>

<Grid 
    bind:data={clients} 
    bind:selectedRows={mySelectedRows}
    showCheckboxes="true" />
```
</Step>

## Full Example

```svelte
<script>
import { Grid, type GridColumn } from "@mediakular/gridcraft";

interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

export let data: PageData;
let clients: Client[] = data.clients;

let showCheckboxes = true;
let selectedRows:Client[] = [];

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name',
    },
    { 
        key: 'lastname', 
        title: 'First Name',
    },
    { 
        key: 'age', 
        title: 'Age'
    },
];
</script>

<!-- Just for demonstration purposes -->
<label for="showCheckboxes">
    <input type="checkbox" checked={showCheckboxes == true} on:change={() => showCheckboxes = !showCheckboxes} id="showCheckboxes" />
    &nbsp;Show checkboxes
</label>
{#if showCheckboxes}
    Selected Rows:
    <pre>
        {JSON.stringify(selectedRows, null, 2)}
    </pre>
{/if}
<!-- End: Just for demonstration purposes -->

<Grid 
    bind:data={clients} 
    bind:columns
    bind:selectedRows
    bind:showCheckboxes />
```
