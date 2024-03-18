<script lang="ts">
    export let isOdd:boolean;
</script>

<tr class="hover:bg-gray-50 dark:hover:bg-slate-500 transition-colors {isOdd ? 'bg-gray-100 dark:bg-slate-700' : 'bg-gray-200 dark:bg-slate-600'}">
    <slot />
</tr>