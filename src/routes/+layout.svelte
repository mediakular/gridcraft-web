<script lang="ts">
    import "../app.css"; 
    import { afterNavigate } from "$app/navigation";
    import CookieNote from "$lib/components/CookieNote.svelte";
    import Matomo from "$lib/matomo/Matomo.svelte";
	import { getCookie } from "$lib/helpers/cookie-helper";
	import { onMount } from "svelte";
	import { dev } from "$app/environment";
	import { tracker } from "$lib/matomo/tracker";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    let requireConsent = $state(true);

    afterNavigate(() => {
        window?.HSStaticMethods && window.HSStaticMethods.autoInit();
    });

    onMount(() => {
        requireConsent = getCookie("cookie_consent") !== "true";
    })
</script>

<CookieNote on:acceptClicked={() => $tracker && $tracker.setConsentGiven()}  />

{#if !dev}
    <Matomo url={"https://analytics.mediakular.com"} siteId={10} doNotTrack={true} {requireConsent} />
{/if}

{@render children?.()}