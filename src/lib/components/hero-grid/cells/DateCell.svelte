<script lang="ts">
  export let value: Date;
  let dateStr: string;

  $:dateStr = value ? (new Date(value)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "-";
</script>

<div class="block text-sm text-gray-800 dark:text-gray-300">{dateStr}</div>
