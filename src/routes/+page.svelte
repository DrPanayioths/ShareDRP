<script lang="ts">
  import Navbar from "./headbar.svelte";
  import Get_file from "./get.svelte";
  import Puller from "./pull.svelte";
  import "./shared.scss";

  // Check if the url protocol is get or pull
  import { onMount } from "svelte";
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
<!-- The Color Pallete Of The Site: https://colorhunt.co/palette/d6efd880af81508d4e1a5319 -->
