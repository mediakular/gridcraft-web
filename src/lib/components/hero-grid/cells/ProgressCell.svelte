<script lang="ts">
    interface Props {
        value: number | undefined;
    }

    let { value = $bindable() }: Props = $props();
    value = value ? value : 0;

    const percent = value * 10;
</script>

<div class="flex items-center gap-x-3">
    <span class="text-xs text-gray-500 dark:text-gray-400">{value}/10</span>
    <div class="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-800">
        <div class="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-300" role="progressbar" style="width: {percent}%" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>