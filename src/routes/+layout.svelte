<script>
    import "../app.css"; 
    import { afterNavigate } from "$app/navigation";
    import CookieNote from "$lib/components/CookieNote.svelte";
  
    afterNavigate(() => {
        window.HSStaticMethods.autoInit();
    });
</script>

<CookieNote />

<slot />