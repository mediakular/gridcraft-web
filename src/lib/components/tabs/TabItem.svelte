<script lang="ts">
    interface Props {
        index: number;
        children?: import('svelte').Snippet;
    }

    let { index, children }: Props = $props();
</script>

<div id="basic-tabs-{index}" class:hidden={index != 1} role="tabpanel" aria-labelledby="basic-tabs-item-{index}">
    {@render children?.()}
</div>