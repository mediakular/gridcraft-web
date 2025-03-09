<script lang="ts">
	import { onMount } from 'svelte';
	
	interface Props {
		name: string;
	}

	let { name = $bindable() }: Props = $props();

	let textarea: HTMLTextAreaElement = $state();
	
	onMount(() => {
		textarea.select();
		document.execCommand('copy');
	});
</script>

<textarea bind:value={name} bind:this={textarea}></textarea>
