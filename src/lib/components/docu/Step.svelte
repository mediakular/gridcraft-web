<!-- @migration-task Error while migrating Svelte code: Declaring or accessing a prop starting with `$$` is illegal (they are reserved for Svelte internals)
https://svelte.dev/e/props_illegal_name -->
<script lang="ts">
    export let number = 1;
    export let title = "";

    const SLOTS = $$props.$$slots;
</script>

<div class="flex mb-4 group doc-step max-w-full">
    <div class="text-sm font-bold text-gray-500 dark:text-gray-400 bg-slate-100 group-hover:bg-slate-200 dark:bg-gray-800 transition-colors rounded h-8 w-8 min-w-8 min-h-8 flex items-center justify-center">
        {number}
    </div>

    <div class="ml-3 basis-full flex flex-col max-w-full pr-10">
        {#if title}
            <div class="text-xl leading-6 mb-3 font-semibold text-gray-800 dark:text-gray-200 mt-1">
                {title}
            </div>
        {/if}

        {#if SLOTS}
            <div class="relative">
                <slot />
                <div class="absolute left-[-1.90rem] {title ? 'top-0 h-full' : 'top-[40px] h-[calc(100%-40px)]'} border-r border-slate-100 group-hover:border-slate-200 transition-colors w-1">&nbsp;</div>
            </div>
        {/if}
    </div>
</div>
