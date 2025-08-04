<script lang="ts">
  import Navbar from "./headbar.svelte";
  import Get_file from "./get.svelte";
  import Puller from "./pull.svelte";
  import "./shared.scss";
  import { onMount } from "svelte";

  // Check if the url protocol is get or pull
  let showPuller = false;
  onMount(() => {
    const base_url = new URL(window.location.href).searchParams;
    const key_check = base_url.get("s");

    if (key_check != null) {
      showPuller = true;
    }
  });
</script>

<Navbar />
<Get_file />

<!-- Pull File From Database -->
{#if showPuller == true}
  <Puller />
{/if}

<!-- To-Do: Add File Upload Mode: Pocketbase Or Vercel Storage -->
<!-- To-Do: Add a if to check if the user wants to use pocketbase and work on vercel version -->
<!-- To-Do: Redesign Main Page To Be Minimalistic -->
<!-- The Color Pallete Of The Site: https://colorhunt.co/palette/d6efd880af81508d4e1a5319 -->
