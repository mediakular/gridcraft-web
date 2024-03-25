<script lang="ts">
	import { browser } from "$app/environment";
	import { getCookie, setCookie } from "$lib/helpers/cookie-helper";
	import { onMount } from "svelte";

	function handleAccept(accept:boolean): any {
        if (browser) {
            setCookie("cookie_consent", accept ? "true" : "false", 365);
            showCookieNote = false;
        }
	}

  $: showCookieNote = false;
  onMount(() => {
      if (browser) {
          const cookieConsent = getCookie("cookie_consent");
          if (cookieConsent !== "true") {
              showCookieNote = true;
          }
      }
  })
</script>

<div class="fixed bottom-0 end-0 z-[60] sm:max-w-xl w-full mx-auto p-6" class:hidden={!showCookieNote}>
    <!-- Card -->
    <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div class="grid sm:flex sm:items-center gap-y-3 sm:gap-y-0 sm:gap-x-5">
        <div class="sm:max-w-sm">
          <h2 class="text-gray-500">
            <span class="font-semibold text-gray-800 dark:text-gray-200">We use cookies</span> to analyze our traffic and create a smooth user experience.
          </h2>
        </div>
        <div class="inline-flex gap-x-2">
          <div>
            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"  on:click={() => handleAccept(false)}>
              Reject
            </button>
          </div>
          <div>
            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-mdkl-green-500 text-white hover:bg-mdkl-green-300 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" on:click={() => handleAccept(true)}>
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Card -->
</div>