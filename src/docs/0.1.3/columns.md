---
title: Columns
description: Learn how to customize columns in your GridCraft data table to suit your specific data presentation needs. Explore various options for defining custom column headers, formatting, and behavior to enhance the clarity and usability of your applications.
date: '2024-3-21'
category: Features
order: 1
categoryOrder: 3
published: true
---

<script lang="ts">
    import DocuGrid from "$lib/components/docu/DocuGrid.svelte"
</script>

Learn how to define custom columns in your GridCraft data table to tailor the data presentation to your specific needs. 

We can use custom column definitions to:

- display custom formatting (Dates, Currencies, etc.)
- calculated values (calculating numbers, dates, etc.)
- columns with custom object data or multiple values (displaying avatar, name and email in one column)
- custom visualization (graphs, sliders, etc.)
- display links/buttons (for opening dialoges/modals, links,  etc.)

## Simple Custom Columns Definition

The simplest way to define custom columns in GridCraft is by specifying an array of `GridColumn` objects and binding it to the `columns` property of the `Grid` component.

Here's how you can define custom columns in your Svelte component:

```svelte title="+page.svelte"
<script>
import { Grid, type GridColumn } from "@mediakular/gridcraft";

// Example interface
interface Client {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    birthdate: Date;
}

export let data: PageData;

let clients: Client[] = data.clients;

let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name'
    },
    { 
        key: 'lastname', 
        title: 'Last Name'
    },
    { 
        key: 'age', 
        title: 'Age'
    },
    { 
        key: 'birthdate', 
        title: 'Birthday'
    }
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns />
```

In this example, we define an array of `GridColumn` objects representing custom columns for a data table of clients. Each GridColumn object specifies the `key` (data property key) and `title` (column header title) for the column.

Replace `{ clients }` with your actual data, and adjust the columns array as needed to define custom columns for your specific data table.

### Hide / Show Columns

To hide a column you can set the column property `visible` to false. This allows you for example to initially hide some columns, which can be displayed later by the user when needed. 

<DocuGrid itemCount={5} columns=[firstname,lastname,age,status] showColumnsShowHide={true} />

```typescript 
let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name',
        visible: false
    },
];
```

### Column Sorting

By default column sorting is enabled for all columns. If you would like to disable column sorting all you need to do is to set the column property `sortable` to `false`.

```typescript 
let columns: GridColumn<Client>[] = [
    { 
        key: 'firstname', 
        title: 'First Name',
        sortable: false
    },
];
```

#### Custom sort value

You can define for each column a custom sort value which will be used for sorting the column instead of the actual value.
To do so you only need to define a function `sortValue` in the specific column definition:

```typescript 
interface Image {
    file: HTMLImageElement;
    filename: string;
}

let columns: GridColumn<Image>[] = [
    { 
        key: 'file',  // Here we define the file-property as column value
        title: 'File Object',
        sortValue: (row: Image) => row.filename, //... but here we say we want to sort by filename
        renderComponent: HtmlImageCell
    },
];
```

Make sure to always provide the function `sortValue` in case the column value is not sortable or if you've defined an `accessor` function that returns an object. 

```typescript 
let columns: GridColumn<Client>[] = [
    { 
        //...
        accessor: (row: Client) => {
            return {
                firstname: row.firstname,
                lastname: row.lastname,
            }
        }, 
        sortValue: (row: Client) => {
            return `${row.firstname} ${row.lastname}`
        }
    },
];
```

When the `sortValue` function is defined, the returned value will be used for sorting the column.

## Custom Columns with Components

Learn how to define custom columns with custom Svelte components in your GridCraft data table for advanced customization and functionality. 

### Custom Formatting

You can enhance the functionality and appearance of your GridCraft data table by defining custom columns with custom Svelte components. 

Here's how you can define custom columns with custom Svelte components:

```svelte title="+page.svelte"
<script>
import { Grid, type GridColumn } from "@mediakular/gridcraft";
// Import your custom Svelte component for rendering a formatted date
import DateCell from "$lib/components/DateCell.svelte";

interface Client {
    // ...
    birthdate: Date;
}

export let data: PageData;
let clients: Client[] = data.clients;

let columns: GridColumn<Client>[] = [
    // ...
    { 
        key: 'birthdate', 
        title: 'Birthday',
        renderComponent: DateCell // Custom Svelte component for rendering a formatted date
    },
    // ...
];
</script>

<Grid 
    bind:data={clients} 
    bind:columns />
```

In this example, we define custom columns with custom Svelte components for rendering formatted dates.

Replace `DateCell` with the appropriate names of your custom Svelte components.

#### Example for the DateCell Component which formats a given date:

```svelte title="DateCell.svelte"
<script>
  export let value: Date;
  let dateStr: string;

  $:dateStr = value ? (new Date(value)).toLocaleDateString('en-US') : "-";
</script>

<div>{dateStr}</div>
```

### Calculated Columns

In cases where we require transformed or multiple properties within our Svelte component, we utilize the `accessor` function property. For instance, consider a scenario where we need to compute the total value before rendering it:

```typescript title="+page.svelte"
interface Product {
    // ...
    amount: number;
    quantity: number;
}

let columns: GridColumn<Product>[] = [
    // ...
    { 
        key: 'total', 
        title: 'Total Price',
        accessor: (row: Product) => { return row.amount * row.quantity },
        renderComponent: CurrencyCell // Our custom column cell component to render a calculated cell and formatted currency 
    },
    // ...
];
```

```svelte title="CurrencyCell.svelte"
<script>
  export let value: number;
  let formattedCurrency: string;

  $: formattedCurrency = value ? value.toFixed(2) : "-";
</script>

<div>${formattedCurrency}</div>
```

### Custom Objects

In the previous examples, the calculated result value (result of `accessor` function) is utilized for sorting the grid column. However, in situations where we need to pass an **object** into our custom component, using the object itself for column sorting is not feasible. Therefore, we must specify a `sortValue` function property:

```typescript title="+page.svelte"
import ClientCell from "$lib/components/ClientCell.svelte";

interface Client {
    // ...
    avatar: string;
    firstname: string;
    lastname: string;
    email: string;
}

let columns: GridColumn<Client>[] = [
    //...
    { 
        key: 'name', 
        title: 'Client',
        // Use an accessor to transform row data, which can be used in your custom renderComponent
        accessor: (row: Client) => { 
            return {
                avatar: row.avatar,
                firstname: row.firstname,
                lastname: row.lastname,
                email: row.email
            }
        },
        // as the default search will not work with our accessor data, we have to provide a sortValue which will be used for sorting
        sortValue: (row: Client) => {
            return `${row.firstname} ${row.lastname}`
        },
        renderComponent: ClientCell // Our custom column cell component to render a column with avatar, full name and email
    }
];
```

#### Here an example for the "ClientCell" custom component

```svelte title="ClientCell.svelte"
<script>
    export let avatar: string;
    export let firstname: string;
    export let lastname: string;
    export let email: string;

    $: fullname = `${firstname} ${lastname}`;
</script>

<div class="my-client-cell">
    <img src="{avatar}" alt="{fullname}" />
    <div>
        <span>{fullname}</span>
        {#if email}
            <span>{email}</span>
        {/if}
    </div>
</div>
```

### Custom Visualization

In this example we will display a progress bar as a column to visualize our data.

```typescript title="+page.svelte"
import ProgressCell from "$lib/components/ProgressCell.svelte";

interface Project {
    // ...
    progress: number;
}

let maxProgress = 10;

let columns: GridColumn<Project>[] = [
    //...
    { 
        key: 'progress', 
        title: 'Progress',
        // We will use the accessor function to transform or row data, which will be used in our custom renderComponent
        accessor: (row: Project) => { 
            return {
                value: row.progress,
                max: row.maxProgress
            }
        },
        // as the default search will not work with our accessor data, we have to provide a sortValue which will be used for sorting
        sortValue: (row: Project) => {
            return row.progress;
        },
        renderComponent: ProgressCell 
    }
];
```

```svelte title="ProgressCell.svelte"
<script>
    export let max: number;
    export let value: number | undefined;
    value = value || 0;

    const percent = 100 / max * value;
</script>

<div>
    <span>{percent} % ({value} / {max})</span>
    <progress value={value} max={max}>{percent} %</progress>
</div>
```

### Action Column

In this example, we'll demonstrate how to include an action column in your GridCraft data table. The action column allows users to perform actions such as editing or deleting entries.

First, let's define our action column in the column definition array:

```typescript
import EditActionsCell from "$lib/components/EditActionsCell.svelte"

let columns: GridColumn<Client>[] = [
    // Other column definitions...
    {
        key: 'actions', // can be any name
        title: 'Client Actions',
        sortable: false,
        accessor: (row: Client) => { 
            return {
                value: row, 
                editClicked: (row: Client) => {  
                    // Perform any action here using any row values (like row.id)
                },
                somethingElseClicked: (row: Client) => {  
                    // Perform another action here
                },
            }
        },
        renderComponent: EditActionsCell
    }
];
```

In the `accessor` function, we return an object containing the `value` as the row and an `editClicked` function (and `somethingElseClicked` function) to handle the action.

#### Define the EditActionsCell Component

Next, let's define the `EditActionsCell` component: 

```svelte title="EditActionsCell.svelte"
<script>
    type T = $$Generic<any>;

    export let value: T;
    export let editClicked: (value: T) => void;
    export let somethingElseClicked: (value: T) => void;

    function handleEditClick() {
        editClicked(value);
    }

    function handleSomeOtherClick() {
        somethingElseClicked(value);
    }
</script>

<button on:click|preventDefault={handleEditClick}>
    Edit
</button>
<a href="#" on:click|preventDefault={handleSomeOtherClick}>
    Something else
</a>
```