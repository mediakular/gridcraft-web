<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		value: number;
	}

	let { value }: Props = $props();
	let currency: string = $state();


	async function updateValue() {
		const formatCurrency = (value: number, locale: string, currency: string, maximumFractionDigits?: number, minimumFractionDigits?: number) => new Intl.NumberFormat(locale, {
            currency: currency,
            style: 'currency',
            maximumFractionDigits: maximumFractionDigits || 0,
            minimumFractionDigits: minimumFractionDigits || 0
        }).format(value);

		currency = formatCurrency(value ? value : 0, "en-US", "USD", 2);
	}
	run(() => {
		value, updateValue()
	});
</script>

<div class="block text-sm text-gray-800 dark:text-gray-300">
	💵 {currency ? currency : '-'}
</div>

