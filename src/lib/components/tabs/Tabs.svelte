<script lang="ts">
    interface Props {
        cssClasses?: string;
        cssClassesContent?: string;
        header?: import('svelte').Snippet;
        content?: import('svelte').Snippet;
    }

    let {
        cssClasses = "",
        cssClassesContent = "mt-3 p-4",
        header,
        content
    }: Props = $props();
</script>
<div class="dark:border-gray-700 {cssClasses}">
    <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
        {@render header?.()}
    </nav>
    <div class={cssClassesContent}>
        {@render content?.()}
    </div>
</div>