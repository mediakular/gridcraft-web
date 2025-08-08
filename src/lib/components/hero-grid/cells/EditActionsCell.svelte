<script lang="ts">
	import type { GridColumnComponentProps } from '@mediakular/gridcraft';

    type T = $$Generic<any>;

    let { value, editClicked }: GridColumnComponentProps = $props();

    function handleClick() {
        editClicked(value)
    }
</script>

<button onclick={(e) => { e.preventDefault(); handleClick(); }}  class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium">
    Edit
</button>