<script lang="ts">
    type T = $$Generic<any>;

    export let value: T;
    export let editClicked: (value: T) => void;

    function handleClick() {
        editClicked(value)
    }
</script>

<button on:click|preventDefault={handleClick} class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium">
    Edit
</button>