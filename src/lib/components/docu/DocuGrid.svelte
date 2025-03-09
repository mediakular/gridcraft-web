<script lang="ts">
    import { Grid, GridFooter, type GridColumn, PrelineTheme, type PagingData } from "@mediakular/gridcraft"
    import clientsJson from '$lib/data/samples/clients.json';

    import ClientCell from "$lib/components/hero-grid/cells/ClientCell.svelte";
    import DateCell from "$lib/components/hero-grid/cells/DateCell.svelte";
    import CurrencyCell from "$lib/components/hero-grid/cells/CurrencyCell.svelte";
    import StatusCell from "$lib/components/hero-grid/cells/StatusCell.svelte";
    import EditActionsCell from "$lib/components/hero-grid/cells/EditActionsCell.svelte";
    import ProgressCell from "$lib/components/hero-grid/cells/ProgressCell.svelte";
    





    interface Props {
        showFooter?: boolean;
        itemCount?: number;
        itemsPerPage?: number;
        groupby?: string;
        columns?: string[];
        groupsExpandedDefault?: boolean;
        showCheckboxes?: boolean;
        selectedRows?: Client[];
        showCheckedDebug?: boolean;
        showColumnsShowHide?: boolean;
        itemsPerPageOptions?: any;
        theme?: any;
    }

    let {
        showFooter = false,
        itemCount = 10,
        itemsPerPage = 10,
        groupby = "",
        columns = [],
        groupsExpandedDefault = true,
        showCheckboxes = false,
        selectedRows = $bindable([]),
        showCheckedDebug = false,
        showColumnsShowHide = false,
        itemsPerPageOptions = [10, 20, 50, 100],
        theme = PrelineTheme
    }: Props = $props();

    let paging = $state({
		itemsPerPage: itemsPerPage, //default 10
		currentPage: 1, //default 1
		itemsPerPageOptions: itemsPerPageOptions
	} as PagingData);


    interface Client {
        id: string;
        firstname: string;
        lastname: string;
        avatar: string;
        email: string;
        age: number;
        status: string;
        progress: number;
        birthdate: string;
        amount: number;
        quantity: number;
    }
    
    let cols: GridColumn<Client>[] = $state([
        { 
            key: 'name', 
            title: 'Name',
            accessor: (row: Client) => {
                return {
                    avatar: row.avatar,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    email: row.email
                }
            }, 
            sortValue: (row: Client) => {
                return `${row.firstname} ${row.lastname}`
            },
            renderComponent: ClientCell,
            visible: columns.includes("name")
        },
        { 
            key: 'status', 
            title: 'Status',
            renderComponent: StatusCell,
            visible: columns.includes("status")
        },
        { 
            key: 'age', 
            title: 'Age',
            visible: columns.includes("age")
        },
        { 
            key: 'birthdate', 
            title: 'Birthday',
            renderComponent: DateCell,
            visible: columns.includes("birthdate")
        },
        { 
            key: 'total', 
            title: 'Total',
            accessor: (row: Client) => { return row.amount * row.quantity },
            renderComponent: CurrencyCell,
            visible: columns.includes("total")
        },
        { 
            key: 'progress', 
            title: 'Progress',
            renderComponent: ProgressCell,
            visible: columns.includes("progress"),
        },
        {
            key: 'actions',
            title: 'Actions',
            sortable: false,
            accessor: (row: Client) => { 
                return {
                    value: row, 
                    editClicked: (value: Client) => {  
                       
                    }
                }
            },
            renderComponent: EditActionsCell,
            visible: columns.includes("actions")
        }
    ]);

    let clients = clientsJson.slice(0, itemCount) as Client[];

</script>

{#if showColumnsShowHide}
    <div class="mb-2 mx-1 sm:mt-1 hs-dropdown relative sm:inline-flex z-20 [--auto-close:inside]">
        <button id="hs-dropdown-auto-close-inside" type="button" class="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Hide/Show Columns
            <svg class="hs-dropdown-open:rotate-180 size-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    
        <div class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-auto-close-inside">
            {#each cols as col (col.key)}
                <div class="relative flex items-start py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div class="flex items-center h-5 mt-1">
                        <input id="checkbox-{col.key}" type="checkbox" value={col.key} checked={col.visible} onchange={() =>  col.visible = !col.visible} disabled={col.key == groupby} class="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                    </div>
                    <label for="checkbox-{col.key}" class="ms-3.5">
                        <span class="mt-1 block text-sm font-semibold text-gray-800 dark:text-gray-300">{col.title}</span>
                    </label>
                </div>
            {/each}
        </div>
    </div>
{/if}

<div class="not-prose overflow-x-scroll border-x border-b border-gray-200 dark:border-gray-700 rounded-md">
    <Grid 
        data={clients} 
        columns={cols} 
        groupBy={groupby} 
        {groupsExpandedDefault}
        {showCheckboxes}
        bind:selectedRows={selectedRows}
        bind:paging
        {theme}
    />
</div>

{#if showCheckedDebug && selectedRows.length > 0}
    <div class="bg-teal-500 text-sm text-white rounded-lg p-4 mt-3" role="alert">
        You selected <span class="font-bold">{selectedRows.length}</span> row{selectedRows.length > 1 ? "s" : ""}.
    </div>
    <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
{/if}

<div class:hidden={!showFooter} >
    <GridFooter bind:paging {theme} />
</div>