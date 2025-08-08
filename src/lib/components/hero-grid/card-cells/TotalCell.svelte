<script lang="ts">
	import type { GridColumnComponentProps } from "@mediakular/gridcraft";

	const formatCurrency = (value: number, locale: string, currency: string, maximumFractionDigits?: number, minimumFractionDigits?: number) => new Intl.NumberFormat(locale, {
		currency: currency,
		style: 'currency',
		maximumFractionDigits: maximumFractionDigits || 0,
		minimumFractionDigits: minimumFractionDigits || 0
	}).format(value);

	let { value }: GridColumnComponentProps = $props();
	let currency: string = $derived(formatCurrency(value ? value : 0, "en-US", "USD", 2));
</script>

<div class="block text-sm text-gray-800 dark:text-gray-300">
	💵 {currency ? currency : '-'}
</div>

