---
title: Grouping
description: Learn how to set up and configure grouping in your GridCraft data grid table. Allow better organization and structure of your data for better data analysis and visualization in your SvelteKit applications.
date: '2024-3-22'
category: Features
order: 3
categoryOrder: 3
published: true
---
<script lang="ts">
    import DocuGrid from "$lib/components/docu/DocuGrid.svelte"
</script>

## How to Use Grouping

Adding grouping to your data table is very simple. We only need to set the `groupby` property on our `<Grid>` component:

```svelte title="+page.svelte"
<Grid 
    bind:data={clients} 
    ...
    groupby={columnKey} />
```

The `groupby` value needs to be a key of one of the defined columns. In the following example `status`:

```typescript title="+page.svelte"
<script>
interface Client {
    ...
    status: Date;
}

let columnKey = "status";
</script>

<Grid 
    bind:data={clients} 
    ...
    bind:groupby={columnKey} />
```

<DocuGrid itemCount={5} groupby="status" columns=[firstname,lastname,age,status]></DocuGrid>


Group headers are collapsable/expandable. By default all group headers are expanded. If we want them to be collapsed by default we can can set the property `groupsExpandedDefault` to `false`.

```svelte title="+page.svelte"
<Grid 
    bind:data={clients} 
    ...
    groupsExpandedDefault={false}
    groupby={columnKey} />
```

<DocuGrid itemCount={5} groupby="status" columns=[firstname,lastname,age,status] groupsExpandedDefault={false}></DocuGrid>


## Full Example

```svelte 
<script>
interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
}

export let data: PageData;
let clients: Client[] = data.clients;

let groupBy = "";

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
    }
];
</script>

<!-- this select box is just for demonstration purposes -->
<select bind:value={groupBy} >
    <option value="">Select Group By Column</option>
    {#each columns as col (col.key)}
        <option value={col.key}>{col.title}</option>
    {/each}
</select> 

<Grid 
    bind:data={clients} 
    bind:columns
    bind:groupby />
```