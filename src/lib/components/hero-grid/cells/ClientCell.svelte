<script lang="ts">
    export let avatar: string;
    export let firstname: string;
    export let lastname: string;
    export let email: string;

    $: fullname = `${firstname} ${lastname}`;
</script>

<div class="flex items-center gap-x-3 max-w-[200px]">
    <img class="h-[2.375rem] w-[2.375rem] drop-shadow-md rounded-full" src="{avatar}" alt="" />
    <div>
        <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">{fullname}</span>
        {#if email}
            <span class="block text-sm text-gray-500 dark:text-gray-400 text-ellipsis max-w-[200px] overflow-hidden" title="{email}">{email}</span>
        {/if}
    </div>
</div>