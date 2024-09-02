<script lang="ts">
  import type { DocuCategory } from "$lib/types";
  import { page } from '$app/stores';

  export let category = "";
  export let title = "";
  export let description = "";
  export let categories:DocuCategory[] = [];

	$: currentPath = $page.url.pathname;
</script>

<!-- Sidebar Toggle -->
<div class="sticky top-[60px] sm:top-[68px] inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
  <div class="flex items-center py-4">
    <!-- Navigation Toggle -->
    <button type="button" class="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
      <span class="sr-only">Toggle Navigation</span>
      <svg class="size-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </button>
    <!-- End Navigation Toggle -->

    <!-- Breadcrumb -->
    <ol class="ms-3 flex items-center whitespace-nowrap" aria-label="Breadcrumb">
      <li class="flex items-center text-sm text-gray-800 dark:text-gray-400">
        {category} 
        <svg class="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </li>
      <li class="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
        {title}
      </li>
    </ol>
    <!-- End Breadcrumb -->
  </div>
</div>
<!-- End Sidebar Toggle -->

<article class="bg-gray-50 dark:bg-slate-900 flex">
    <!-- ========== MAIN CONTENT ========== -->
   
  
    <!-- Sidebar -->
    <div id="application-sidebar" class="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-[69px] start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            {#each categories as cat}
              <span class="block pt-4 pb-2 px-2 text-xs font-medium uppercase text-gray-400 dark:text-gray-600">
                {cat.title}
              </span>

              <ul class="space-y-1.5">
                {#each cat.pages as page}
                  <li>
                    <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900/60 dark:text-white"
                    class:bg-gray-100={currentPath === "/docs/" + page.slug || (page.slug == "introduction" && currentPath == "/docs")}
                    class:dark:bg-gray-900={currentPath === "/docs/" + page.slug || (page.slug == "introduction" && currentPath == "/docs")}
                    href="/docs/{page.slug}">
                      {page.title}
                    </a>
                  </li>
                {/each}
              </ul>
          {/each}
        </nav>
    </div>
    <!-- End Sidebar -->
  
    <div class="w-full flex flex-col-reverse md:flex-row">
      <!-- Content -->
      <div class="px-4 mt-24 sm:px-6 md:px-8 lg:ps-72 pb-10">
        <hgroup class="mb-4 max-w-[65ch]">
          <p class="mb-2 text-sm font-semibold text-blue-600">{category}</p>
          <h1 class="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">{title}</h1>
          <p class="mt-2 text-lg text-gray-800 dark:text-gray-400">{description}</p>
        </hgroup>
        <hr class="mt-8 mb-10 max-w-[65ch]" />
        <div class="prose lg:prose-lg dark:prose-invert prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:text-violet-500">
          <slot />
        </div>
      </div>
      <!-- End Content -->
      <!-- ========== END MAIN CONTENT ========== -->

      <aside class="mx-auto mt-24 max-h-screen md:sticky md:top-[120px] lg:top-[80px] md:max-w-1/3 lg:max-w-1/3 block grow">
        <figure class="pr-10 w-full ">
          <div id="toc" class="prose"><span class="text-sm text-gray-600 font-bold ml-4">In this article</span></div>
        </figure>
      </aside>
    </div>
</article>