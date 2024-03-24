<script lang="ts">
    export let active = false
    export let index:number;
</script>

<button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" class:active={active} id="basic-tabs-item-{index}" data-hs-tab="#basic-tabs-{index}" aria-controls="basic-tabs-{index}" role="tab">
    <slot />
</button>