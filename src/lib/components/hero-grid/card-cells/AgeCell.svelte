<script lang="ts">
  interface Props {
    value: number;
  }

  let { value }: Props = $props();
</script>

<div class="block text-sm text-gray-800 dark:text-gray-300">
  🎂 {value}
</div>
