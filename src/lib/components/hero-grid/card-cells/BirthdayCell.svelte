<script lang="ts">
  interface Props {
    value: Date;
  }

  let { value }: Props = $props();
  let dateStr: string = $derived(value ? (new Date(value)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "-");

  
</script>

<div class="block text-sm text-gray-800 dark:text-gray-300">
  📅 {dateStr}
</div>
