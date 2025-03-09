<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<h2>What next?</h2>

<div class="flex flex-col sm:flex-row gap-6 justify-stretch">
    {@render children?.()}
</div>