<script lang="ts">
    export let index:number;
</script>

<div id="basic-tabs-{index}" class:hidden={index != 1} role="tabpanel" aria-labelledby="basic-tabs-item-{index}">
    <slot></slot>
</div>