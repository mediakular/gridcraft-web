<script lang="ts">
    interface Props {
        value: number | undefined;
        isGroupByHeader?: boolean;
    }

    let { value = $bindable(), isGroupByHeader = false }: Props = $props();
    value = value ? value : 0;

    const percent = value * 10;
</script>

<div class="relative col-span-2 min-w-100">
    <span class="absolute top-1 {!isGroupByHeader ? 'left-[45%]' : 'left-2'} text-xs text-gray-500 dark:text-gray-400">{value}/10</span>
    <div class="flex w-auto bg-gray-200 overflow-hidden dark:bg-gray-600 h-6 {!isGroupByHeader ? '-ml-3 -mr-3 -mb-3' : 'w-[200px] rounded-full'}">
        <div class="flex flex-col justify-center overflow-hidden bg-violet-300 dark:bg-violet-600" role="progressbar" style="width: {percent}%" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>