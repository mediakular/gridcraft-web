<script>
	import DocuLayout from "$lib/components/docu/DocuLayout.svelte";

    export let data
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<DocuLayout title={data.meta.title} description={data.meta.description} category={data.meta.category} categories={data.categories}>
	<svelte:component this={data.content} />
</DocuLayout>
