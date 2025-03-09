<script lang="ts">
    interface Props {
        avatar: string;
        firstname: string;
        lastname: string;
        email: string;
    }

    let {
        avatar,
        firstname,
        lastname,
        email
    }: Props = $props();

    let fullname = $derived(`${firstname} ${lastname}`);
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