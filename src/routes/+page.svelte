<script lang="ts">
  import Navbar from "./headbar.svelte";
  import Get_file from "./get.svelte";

  let name = "kostas";
  let provider = "upload.gofile.io";
  let total_downloads = $state(0);

  function increase_download() {
    total_downloads += 1;
  }
</script>

<Navbar />
<Get_file />
<button onclick={increase_download}>George Mac {total_downloads}</button>

<style>
  :root {
    background-color: #d6efd8;
  }
</style>
