<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    type T = $$Generic<any>;

    interface Props {
        value: T;
        editClicked: (value: T) => void;
    }

    let { value, editClicked }: Props = $props();

    function handleClick() {
        editClicked(value)
    }
</script>

<button onclick={preventDefault(handleClick)} class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium">
    Edit
</button>