<script lang="ts">

    interface Props {
        avatar: string;
        firstname: string;
        lastname: string;
        email: string;
        isGroupByHeader?: boolean;
    }

    let {
        avatar,
        firstname,
        lastname,
        email,
        isGroupByHeader = false
    }: Props = $props();

    let fullname = $derived(`${firstname} ${lastname}`);
</script>

<div class="flex {isGroupByHeader ? 'gap-x-4 mr-3' : 'flex-col col-span-2 gap-y-5 max-w-[200px]'} items-start">
    <img class="{isGroupByHeader ? 'h-[3rem] w-[3rem]': 'h-[5rem] w-[5rem]'} drop-shadow-md rounded-md" src="{avatar}" alt="" />
    <div>
        <span class="block text-md font-semibold text-gray-800 dark:text-gray-200">{fullname}</span>
        {#if email}
            <span class="block text-sm text-gray-500 dark:text-gray-400 text-ellipsis max-w-[200px] overflow-hidden" title="{email}">{email}</span>
        {/if}
    </div>
</div>