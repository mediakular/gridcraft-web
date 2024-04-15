<script lang="ts">
	import { Grid, GridFooter, type GridColumn, type GridFilter, PlainTableCssTheme, PrelineTheme, CardsPlusTheme, type PagingData, type GridTheme } from "@mediakular/gridcraft";
    import clientsJson from '$lib/data/samples/clients.json';

	import HeroTable from "$lib/components/hero-grid/appearance/Table.svelte";

    import ClientCell from "$lib/components/hero-grid/cells/ClientCell.svelte";
    import DateCell from "$lib/components/hero-grid/cells/DateCell.svelte";
    import CurrencyCell from "$lib/components/hero-grid/cells/CurrencyCell.svelte";
    import StatusCell from "$lib/components/hero-grid/cells/StatusCell.svelte";
	import ProgressCell from "$lib/components/hero-grid/cells/ProgressCell.svelte";
    import EditActionsCell from "$lib/components/hero-grid/cells/EditActionsCell.svelte";

    // Card Theme Cells
    import ClientCellCard from "$lib/components/hero-grid/card-cells/ClientCell.svelte";
    import AgeCellCard from "$lib/components/hero-grid/card-cells/AgeCell.svelte";
    import DateCellCard from "$lib/components/hero-grid/card-cells/BirthdayCell.svelte";
    import TotalCellCard from "$lib/components/hero-grid/card-cells/TotalCell.svelte";
    import StatusCellCard from "$lib/components/hero-grid/card-cells/StatusCell.svelte";
	import ProgressCellCard from "$lib/components/hero-grid/card-cells/ProgressCell.svelte";

	import { SearchIcon } from "lucide-svelte";
	import DarkModeButton from "../DarkModeButton.svelte";
	import Features from "../Features.svelte";

    let clients = clientsJson as Client[];
    let theme = PrelineTheme;
    theme.grid.container = HeroTable;

    let paging = {
        itemsPerPage: (theme == CardsPlusTheme ? 9 : 10),
        currentPage: 1,
        itemsPerPageOptions: (theme == CardsPlusTheme ? [9, 18, 36, 72] : [10, 20, 50, 100])
    } as PagingData

    let showCheckboxes = true;
    let groupBy = "";

    let selectedRows:Client[] = [];

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

    let columns: GridColumn<Client>[] = [
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
        },
        { 
            key: 'status', 
            title: 'Status',
            renderComponent: StatusCell
        },
        { 
            key: 'age', 
            title: 'Age',
        },
        { 
            key: 'birthdate', 
            title: 'Birthday',
            renderComponent: DateCell,
        },
        { 
            key: 'total', 
            title: 'Total',
            accessor: (row: Client) => { return row.amount * row.quantity },
            renderComponent: CurrencyCell,
        },
        { 
            key: 'progress', 
            title: 'Progress',
            renderComponent: ProgressCell,
        },
        {
            key: 'actions',
            title: '',
            sortable: false,
            accessor: (row: Client) => { 
                return {
                    value: row, 
                    editClicked: (value: Client) => {  
                        alert(`Edit ${value.firstname} ${value.lastname}`)
                    }
                }
            },
            renderComponent: EditActionsCell
        }
    ];

    let cardColumns: GridColumn<Client>[] = [
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
            renderComponent: ClientCellCard
        },
        { 
            key: 'status', 
            title: 'Status',
            renderComponent: StatusCellCard
        },
        { 
            key: 'age', 
            title: 'Age',
            renderComponent: AgeCellCard
        },
        { 
            key: 'birthdate', 
            title: 'Birthday',
            renderComponent: DateCellCard
        },
        { 
            key: 'total', 
            title: 'Total',
            accessor: (row: Client) => { return row.amount * row.quantity },
            renderComponent: TotalCellCard
        },
        { 
            key: 'progress', 
            title: 'Progress',
            renderComponent: ProgressCellCard
        },
        // {
        //     key: 'actions',
        //     title: '',
        //     sortable: false,
        //     accessor: (row: Client) => { 
        //         return {
        //             value: row, 
        //             editClicked: (value: Client) => {  
        //                 alert(`Edit ${value.firstname} ${value.lastname}`)
        //             }
        //         }
        //     },
        //     renderComponent: EditActionsCell
        // }
    ];

    $: dataColumns = (theme === CardsPlusTheme ? cardColumns : columns);

    let textSearch = "";    
    let filters: GridFilter[];
    $: filters = [
        {   
            key: "text-search", 
            columns: ["name", "total", "age"], 
            filter: (row: any, colKey:string) => { 
                const search = (val: string | null) => val != undefined && val.toString().toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());
                switch (colKey) {
                    case "name":
                        return search(row.firstname) || search(row.lastname) || search(row.email);
                    case "total":
                    case "age":
                        return search(row)
                }
                return true
            }, 
            active: (textSearch && textSearch.length > 0) ? true : false 
        },
        { key: "status-active", columns: "status", filter: (val: any) => { return val != "active" }, active: false },
        { key: "status-inactive", columns: "status", filter: (val: any) => { return val != "inactive" }, active: false },
        { key: "status-pending", columns: "status", filter: (val: any) => { return val != "pending" }, active: false },
        {   
            key: "progress", 
            columns: "progress", 
            filter: (val: any) => { 
                if ("lte" === progressOperator) {
                    return val <= progressFilter
                } else if ("gte" === progressOperator) {
                    return val >= progressFilter
                } else {
                    return val === progressFilter 
                }
            }, 
            active: (progressFilter != 10 || progressOperator != "lte") ? true : false
        },
    ];

    $: activeFilterActive = !filters[1].active;
    $: inactiveFilterActive = !filters[2].active;
    $: pendingFilterActive = !filters[3].active;

    let progressFilter = 10;
    let progressOperator = "lte";

    function handleThemeChange(setTheme: GridTheme) {
        if (setTheme == PrelineTheme) {
            setTheme.grid.container = HeroTable;
        }

        theme = setTheme;

        dataColumns = (theme === CardsPlusTheme ? cardColumns : columns);

        paging = {
            itemsPerPage: (theme == CardsPlusTheme ? 9 : 10),
            currentPage: 1,
            itemsPerPageOptions: (theme == CardsPlusTheme ? [9, 18, 36, 72] : [10, 20, 50, 100])
        } as PagingData;
    }
</script>



<div class="flex flex-col items-center rounded-t-full relative mt-[2rem]">
    <div class="after:bg-radient-ellipse-c after:from-blue-600 after:dark:from-blue-600 after:from-0% after:to-transparent after:to-70% after:z-[-1] after:absolute after:top-[-10rem] after:left-0 after:w-full after:h-full after:animate-pulse after:duration-[6000ms] opacity-80"></div>

    <div class="flex flex-col justify-center items-center gap-2 z-20 mb-3">
        <span class="text-gray-600 dark:text-gray-300 text-sm">Try some themes:</span>
        <div class="bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur p-2 px-2 rounded-md">
            <button type="button" class="inline-flex justify-center {theme === PlainTableCssTheme ? 'bg-gradient-to-tl from-blue-600 to-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-white'} items-center gap-x-3 text-center hover:opacity-90 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-1  py-3 px-4 dark:focus:ring-offset-gray-800" on:click={() =>  handleThemeChange(PlainTableCssTheme)}>Plain Table Css</button>
            <button type="button" class="inline-flex justify-center {theme === PrelineTheme ? 'bg-gradient-to-tl from-blue-600 to-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-white'} items-center gap-x-3 text-center  hover:opacity-90 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-1  py-3 px-4 dark:focus:ring-offset-gray-800" on:click={() => handleThemeChange(PrelineTheme)}>Preline</button>
            <button type="button" class="relative inline-flex justify-center {theme === CardsPlusTheme ? 'bg-gradient-to-tl from-blue-600 to-violet-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-white'} items-center gap-x-3 text-center  hover:opacity-90 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-1  py-3 px-4 dark:focus:ring-offset-gray-800" on:click={() => handleThemeChange(CardsPlusTheme)}>
                CardsPlus 
                <span class="flex absolute top-0 end-0 -mt-2 -me-2">
                    <span class="animate-ping absolute inline-flex size-full rounded-full bg-violet-400 opacity-75 dark:bg-violet-600"></span>
                    <span class="relative inline-flex text-xs bg-violet-500 text-white rounded-full py-0.5 px-1.5">
                        NEW
                    </span>
                </span>
            </button>
        </div>
    </div>
    

    <div class="relative z-20 max-w-full lg:w-[65rem] p-4 drop-shadow-xl rounded-lg overflow-clip  ">
        <div class="rounded-lg drop-shadow-lg">
            <Grid 
                data={clients} 
                columns={dataColumns} 
                bind:selectedRows
                bind:groupBy
                bind:showCheckboxes
                bind:filters
                {paging}
                {theme}
            />
        </div>

        {#if paging.totalResults == 0}
            <div class="text-sm text-gray-800 dark:text-gray-700 p-4 bg-white drop-shadow-md dark:bg-slate-200 rounded-md mt-2">No rows selected</div>
        {/if}
    </div>

    <div class="z-10 bg-gradient-to-tl from-blue-600 to-violet-600 w-full flex flex-col items-center mt-[-3rem] pt-[3rem]">
        {#if selectedRows.length > 0}
            <div class="bg-teal-500 text-sm text-white rounded-lg p-4 mb-3" role="alert">
                You selected <span class="font-bold">{selectedRows.length}</span> row{selectedRows.length > 1 ? "s" : ""}.
                <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-teal-400 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-teal-900" on:click={() => selectedRows = []}>
                    <span class="sr-only">Remove badge</span>
                    <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        {/if}

        <div>
            {#if filters[0].active}
                <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-slate-800/50 dark:text-gray-300">
                    Search: {textSearch}
                    <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900" on:click={() => textSearch = ""}>
                        <span class="sr-only">Remove badge</span>
                        <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </span>
            {/if}
            {#if filters[1].active}
                <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-slate-800/50 dark:text-gray-300">
                    Status != Active
                    <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900" on:click={() => filters[1].active = false}>
                        <span class="sr-only">Remove badge</span>
                        <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </span>
            {/if}
            {#if filters[2].active}
                <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-slate-800/50 dark:text-gray-300">
                    Status != Inactive
                    <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900" on:click={() => filters[2].active = false}>
                        <span class="sr-only">Remove badge</span>
                        <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </span>
            {/if}
            {#if filters[3].active}
                <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-slate-800/50 dark:text-gray-300">
                    Status != Pending
                    <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900" on:click={() => filters[3].active = false}>
                        <span class="sr-only">Remove badge</span>
                        <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </span>
            {/if}
            {#if filters[4].active}
                <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-slate-800/50 dark:text-gray-300">
                    Progress {progressOperator == "lte" ? "<=" : ""} {progressOperator == "gte" ? ">=" : ""} {progressOperator == "equ" ? "=" : ""} {progressFilter}
                    <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900" on:click={() => {progressFilter = 10; progressOperator = "lte"}}>
                        <span class="sr-only">Remove badge</span>
                        <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </span>
            {/if}
            {#if groupBy != ""}
                <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-slate-800/50 dark:text-gray-300">
                    Grouped by {dataColumns.find(x => x.key == groupBy)?.title}
                    <button type="button" class="flex-shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 focus:text-blue-500 dark:hover:bg-blue-900" on:click={() => { groupBy = "" }}>
                        <span class="sr-only">Remove badge</span>
                        <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </span>
            {/if}
        </div>

        <div class="flex flex-col items-center w-full mx-auto p-6">
            <div class="flex justify-center">
                <div class="flex bg-gray-100/10 hover:bg-gray-100/40 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <nav class="sm:space-x-2 grid grid-cols-2 sm:flex sm:flex-row " aria-label="Tabs" role="tablist">
                        <button type="button" class="hs-tab-active:bg-white/80 hs-tab-active:text-gray-800 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-200 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white transition-all active" id="segment-item-1" data-hs-tab="#segment-1" aria-controls="segment-1" role="tab">
                            Paging
                        </button>
                        <button type="button" class="hs-tab-active:bg-white/80 hs-tab-active:text-gray-800 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-200 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white transition-all" id="segment-item-2" data-hs-tab="#segment-2" aria-controls="segment-2" role="tab">
                            Filters
                        </button>
                        <button type="button" class="hs-tab-active:bg-white/80 hs-tab-active:text-gray-800 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-200 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white transition-all" id="segment-item-3" data-hs-tab="#segment-3" aria-controls="segment-3" role="tab">
                            Grouping
                        </button>
                        <button type="button" class="hs-tab-active:bg-white/80 hs-tab-active:text-gray-800 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-200 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white transition-all" id="segment-item-4" data-hs-tab="#segment-4" aria-controls="segment-4" role="tab">
                            Columns
                        </button>
                        <button type="button" class="hs-tab-active:bg-white/80 hs-tab-active:text-gray-800 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-200 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white transition-all" id="segment-item-5" data-hs-tab="#segment-5" aria-controls="segment-5" role="tab">
                            Appearance
                        </button>
                    </nav>
                </div>
            </div>
            
            <div class="my-3 rounded-lg bg-white/30 p-6 w-full max-w-3xl">
                <div id="segment-1" class="" role="tabpanel" aria-labelledby="segment-item-1">
                    <GridFooter bind:paging {theme} />
                </div>
                <div id="segment-2" class="hidden" role="tabpanel" aria-labelledby="segment-item-2">
                    <div class="grid grid-rows-3 grid-flow-col gap-4">
                        <div class="col-span-2">
                            <div class="relative flex">
                                <input type="text" placeholder="Enter Filter Term (Name, Email, etc.)" bind:value={textSearch} class="block w-full p-4 pl-14 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                                    <svelte:component this={SearchIcon} class="stroke-gray-700 dark:border-gray-300" />
                                </div>
                            </div>
                        </div>
                        <div class="row-span-2 col-span-2">
                            <div class="bg-white/50 dark:bg-slate-900 rounded-md p-4">
                                <div class="flex justify-between text-xs text-gray-800 dark:text-gray-200">
                                    <label for="steps-range-slider-usage">Max. Progess</label> <span class="font-bold">{progressFilter}</span>
                                </div>
                                <input type="range" class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
                                    [&::-webkit-slider-thumb]:w-2.5
                                    [&::-webkit-slider-thumb]:h-2.5
                                    [&::-webkit-slider-thumb]:-mt-0.5
                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:bg-white
                                    [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                                    [&::-webkit-slider-thumb]:rounded-full
                                    [&::-webkit-slider-thumb]:transition-all
                                    [&::-webkit-slider-thumb]:duration-150
                                    [&::-webkit-slider-thumb]:ease-in-out
                                    [&::-webkit-slider-thumb]:dark:bg-slate-700
            
                                    [&::-moz-range-thumb]:w-2.5
                                    [&::-moz-range-thumb]:h-2.5
                                    [&::-moz-range-thumb]:appearance-none
                                    [&::-moz-range-thumb]:bg-white
                                    [&::-moz-range-thumb]:border-4
                                    [&::-moz-range-thumb]:border-blue-600
                                    [&::-moz-range-thumb]:rounded-full
                                    [&::-moz-range-thumb]:transition-all
                                    [&::-moz-range-thumb]:duration-150
                                    [&::-moz-range-thumb]:ease-in-out
            
                                    [&::-webkit-slider-runnable-track]:w-full
                                    [&::-webkit-slider-runnable-track]:h-2
                                    [&::-webkit-slider-runnable-track]:bg-gray-100
                                    [&::-webkit-slider-runnable-track]:rounded-full
                                    [&::-webkit-slider-runnable-track]:dark:bg-gray-700
            
                                    [&::-moz-range-track]:w-full
                                    [&::-moz-range-track]:h-2
                                    [&::-moz-range-track]:bg-gray-100
                                    [&::-moz-range-track]:rounded-full" id="steps-range-slider-usage" min="0" max="10" step="1" bind:value={progressFilter}>
                                    
                                <div class="text-xs text-gray-800 dark:text-gray-200 flex gap-4">
                                    <div class="flex">
                                        <input type="radio" name="hs-radio-group" value="lte" bind:group={progressOperator} class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-1" checked>
                                        <label for="hs-radio-group-1" class="text-sm text-gray-500 ms-2 dark:text-gray-400">&lt;=</label>
                                    </div>
                                
                                    <div class="flex">
                                        <input type="radio" name="hs-radio-group" value="gte" bind:group={progressOperator} class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-2">
                                        <label for="hs-radio-group-2" class="text-sm text-gray-500 ms-2 dark:text-gray-400">&gt;=</label>
                                    </div>
                                
                                    <div class="flex">
                                        <input type="radio" name="hs-radio-group" value="equ" bind:group={progressOperator} class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-radio-group-3">
                                        <label for="hs-radio-group-3" class="text-sm text-gray-500 ms-2 dark:text-gray-400">=</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row-span-3">
                            <div class="flex flex-col bg-white/50 dark:bg-slate-900 rounded-md p-4">
                                <label for="hs-as-columns-dropdown-all-active" class="flex py-2.5 px-3 capitalize">
                                    <input type="checkbox" bind:checked={activeFilterActive} on:click={() => filters[1].active = !filters[1].active} class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-40" id="hs-as-columns-dropdown-all-active">
                                    <span class="ml-2 py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                        <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        Active
                                    </span>
                                </label>
                                <label for="hs-as-columns-dropdown-all-inactive" class="flex py-2.5 px-3 capitalize">
                                    <input type="checkbox" bind:checked={inactiveFilterActive} on:click={() => filters[2].active = !filters[2].active} class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-40" id="hs-as-columns-dropdown-all-inactive">
                                    <span class="ml-2 py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
                                        <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                        Inactive
                                    </span>
                                </label>
                                <label for="hs-as-columns-dropdown-all-pending" class="flex py-2.5 px-3 capitalize">
                                    <input type="checkbox" bind:checked={pendingFilterActive} on:click={() => filters[3].active = !filters[3].active} class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 disabled:opacity-40" id="hs-as-columns-dropdown-all-pending">
                                    <span class="ml-2 py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                        <svg class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                        Pending
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="segment-3" class="hidden" role="tabpanel" aria-labelledby="segment-item-3">
                    <div class="max-w-sm space-y-3 mx-auto">
                        <select id="groupBySelect" bind:value={groupBy} class="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
                            <option value="" class="text-gray-100">Select Column to Group By</option>
                            {#each dataColumns.filter(x => x.visible != false && x.key != 'actions') as col (col.key)}
                                <option value={col.key}>{col.title}</option>
                            {/each}
                        </select> 
                    </div>
                </div>
                <div id="segment-4" class="hidden" role="tabpanel" aria-labelledby="segment-item-4">
                    <div class="grid grid-rows-1 grid-cols-2 grid-flow-col gap-4">
                    
                        <div class="flex flex-col gap-2">
                            {#each dataColumns as col (col.key)}
                                <label for="checkbox-{col.key}" class="bg-white/50 dark:bg-slate-900 hover:bg-white/60 hover:dark:bg-slate-900/90 cursor-pointer rounded-md px-4 py-2 {col.visible ? '' : 'opacity-60'}" title="{col.title}">
                                    <input type="checkbox" value={col.key} checked={col.visible} on:change={() =>  col.visible = !col.visible } disabled={col.key == groupBy} class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="checkbox-{col.key}">
                                    <label for="checkbox-{col.key}" class="text-sm text-gray-800 ms-3 dark:text-gray-400">{col.title}{col.key == 'actions' ? 'Actions' : ''}</label>
                                </label>
                            {/each}
                        </div>
                        <div class="bg-white/50 dark:bg-slate-900 rounded-md p-4">
                            <div class="flex">
                                <input type="checkbox" checked={showCheckboxes} on:change={() =>  { showCheckboxes = !showCheckboxes; selectedRows = [] } } class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="checkbox-showCheckboxes">
                                <label for="checkbox-showCheckboxes" class="text-sm text-gray-800 ms-3 dark:text-gray-400">Show checkboxes</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="segment-5" class="hidden" role="tabpanel" aria-labelledby="segment-item-5">
                    <div class="grid grid-rows-1 grid-cols-2 grid-flow-col gap-4">
                        <div class="bg-white/50 dark:bg-slate-900 rounded-md p-4 flex items-center">
                            <div class="bg-gray-100 dark:bg-slate-700 rounded-md p-2"><DarkModeButton /></div>
                            <span class="text-sm text-gray-800 ms-3 dark:text-gray-400"> Switch between light and dark mode</span>
                        </div>

                        <div class="bg-white/50 dark:bg-slate-900 rounded-md p-4 flex flex-wrap items-center gap-4">
                            <button class="inline-flex justify-center {theme === PlainTableCssTheme ? 'bg-gradient-to-tl from-blue-600 to-violet-600' : 'bg-gray-700 '} items-center gap-x-3 text-center hover:opacity-90 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800" on:click={() => handleThemeChange(PlainTableCssTheme)}>Plain Css Theme</button>
                            <button class="inline-flex justify-center {theme === PrelineTheme ? 'bg-gradient-to-tl from-blue-600 to-violet-600' : 'bg-gray-700 '} items-center gap-x-3 text-center  hover:opacity-90 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800" on:click={() => handleThemeChange(PrelineTheme)}>Preline Theme</button>
                            <button class="inline-flex justify-center {theme === CardsPlusTheme ? 'bg-gradient-to-tl from-blue-600 to-violet-600' : 'bg-gray-700 '} items-center gap-x-3 text-center  hover:opacity-90 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800" on:click={() =>handleThemeChange(CardsPlusTheme)}>CardsPlus Theme</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Features />

    </div>
</div>
