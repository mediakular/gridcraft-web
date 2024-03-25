<script>
	import DocuLayout from "$lib/components/docu/DocuLayout.svelte";

    export let data
</script>

<svelte:head>
	<title>{data.meta.title} | Documentation GridCraft: SvelteKit Data Grid Solution</title>
	<link rel="canonical" href="https://gridcraft.mediakular.com/docs/{data.meta.slug}"> 

	<meta name="description" content="{data.meta.description}">
	<meta name="keywords" content="GridCraft, SvelteKit, data grid, data management, data visualization, data analysis, customizable grid, efficient grid, powerful grid, JavaScript grid library, dynamic data grid">
	<meta name="author" content="mediakular">
	<meta property="og:title" content="{data.meta.title} | Documentation GridCraft: SvelteKit Data Grid Solution" />
	<meta property="og:type" content="article" />
	<meta property="og:description" content="Empower your projects with GridCraft, the comprehensive data grid library designed for developers. Streamline data management, enhance user experience, and unleash the full potential of your applications. Get started now!">
	<meta property="og:image" content="https://gridcraft.mediakular.com/webpage.jpg">
	<meta property="og:url" content="https://gridcraft.mediakular.com/docs/{data.meta.slug}">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="{data.meta.title} | Documentation GridCraft: SvelteKit Data Grid Solution">
	<meta name="twitter:description" content="{data.meta.description}">
	<meta name="twitter:image" content="https://gridcraft.mediakular.com/webpage.jpg">
</svelte:head>

<DocuLayout title={data.meta.title} description={data.meta.description} category={data.meta.category} categories={data.categories}>
	<svelte:component this={data.content} />
</DocuLayout>
