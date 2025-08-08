<script lang="ts">
	import type { GridColumnComponentProps } from "@mediakular/gridcraft";

  let { value }: GridColumnComponentProps = $props();
</script>

<div class="block text-sm text-gray-800 dark:text-gray-300">
  🎂 {value}
</div>
