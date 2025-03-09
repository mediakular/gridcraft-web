<script lang="ts">
    // Taken from https://github.com/sinnwerkstatt/sveltekit-matomo/  
    // Needed some adaptions and didn't work when imported
    // Should be tested lateron.
    // Adaptions : 
    // - Added debug
    // - added function setConsentGiven in tracker
    // - added mountingState to prevent duplicate tracking on init and afterNavigate

    import { onMount } from "svelte"
    import { env } from "$env/dynamic/public"
    import { afterNavigate } from "$app/navigation"
    import { page } from "$app/stores"
    import { tracker } from "$lib/matomo/tracker"
  
  
  interface Props {
    url?: string;
    siteId?: number;
    disableCookies?: boolean;
    requireConsent?: boolean;
    doNotTrack?: boolean;
    debug?: boolean;
    heartBeat?: number | null;
    linkTracking?: boolean | null;
  }

  let {
    url = env.PUBLIC_MATOMO_URL,
    siteId = +env.PUBLIC_MATOMO_SITE_ID,
    disableCookies = false,
    requireConsent = false,
    doNotTrack = false,
    debug = false,
    heartBeat = 15,
    linkTracking = null
  }: Props = $props();
  
    async function initializeMatomo() {
        
        const matomo = window.Matomo

        debug && console.log("initializeMatomo", { matomo, url, siteId, disableCookies, requireConsent, doNotTrack, heartBeat, linkTracking });

        if (!matomo) return
    
        const track = matomo.getTracker(`${url}/matomo.php`, siteId)
        if (!track) return
    
        if (disableCookies) track.disableCookies()
        if (requireConsent) track.requireConsent()
        if (doNotTrack) track.setDoNotTrack(true)
        if (heartBeat) track.enableHeartBeatTimer(heartBeat)
        if (linkTracking !== null) track.enableLinkTracking(linkTracking)
    
        tracker.set(track)
    
        track.setCustomDimension(1, $page.data.user ? "true" : "false")
        track.setCustomUrl($page.url.href)
        track.trackPageView()

        debug && console.log("Matomo initialized, pageview tracked", $page.url.href);
    }

    let mountingState = false;
  
    onMount(async () => {
        debug && console.log("Matomo onMount");
        mountingState = true
        setTimeout(async () => {
            await initializeMatomo();
            mountingState = false;
        }, 100);
    })
  
    afterNavigate(async ({ to }) => {
        if (mountingState) return;
        if (!$tracker) {
            debug && console.log("Matomo afterNavigate");
            await initializeMatomo()
            return
        }
    
        if (to?.url.href && $tracker) {
            $tracker.setCustomDimension(1, $page.data.user ? "true" : "false")
            $tracker.setCustomUrl(to.url.href)
            $tracker.trackPageView()
            debug && console.log("Matomo pageview tracked", to.url.href, { url, siteId, disableCookies, requireConsent, doNotTrack, heartBeat, linkTracking });
        } else {
            debug && console.log("Matomo pageview NOT tracked", to?.url.href, $tracker, { url, siteId, disableCookies, requireConsent, doNotTrack, heartBeat, linkTracking });
        }
    })
</script>
  
<svelte:head>
    {#if url}
        <script async defer src={`${url}/matomo.js`}></script>
    {/if}
</svelte:head>