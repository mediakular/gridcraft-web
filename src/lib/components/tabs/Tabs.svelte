<script lang="ts">
    export let cssClasses = "";
    export let cssClassesContent = "mt-3 p-4";
</script>
<div class="dark:border-gray-700 {cssClasses}">
    <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
        <slot name="header"></slot>
    </nav>
    <div class={cssClassesContent}>
        <slot name="content"></slot>
    </div>
</div>