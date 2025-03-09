<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="overflow-x-scroll rounded-lg drop-shadow-lg">
    <table class="max-w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {@render children?.()}
    </table>
</div>