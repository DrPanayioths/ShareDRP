<!-- To-Do: Add PreConfuriged File For The Pocketbase -->
<!-- To-Do: Add File Access With The Unique Code -->
<!-- To-Do: Add Notification About File Status -->

<script lang="ts">
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";
  import searchPng from "$lib/search.png";

  // File Upload System
  const pb = new PocketBase("http://127.0.0.1:8090");
  let input: HTMLInputElement | null = null;

  onMount(() => {
    input = document.getElementById("upload") as HTMLInputElement;
  });

  async function upload_sequence() {
    const id = Array(15)
      .fill(0)
      .map(() => Math.floor(Math.random() * 36).toString(36))
      .join("");

    if (input && input.files) {
      const data = {
        id: id,
        file: input.files[0],
      };

      await pb.collection("Files").create(data);
    } else {
      console.error("No file selected");
    }
  }
</script>

<!-- Drag And Drop Font -->
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
  rel="stylesheet"
/>

<div id="drop_system">
  <input id="upload" type="file" multiple on:change={upload_sequence} />
  <div id="dropper_ui">
    <div id="border">
      <div id="center_data">
        <img
          src={searchPng}
          class="no-select"
          id="search_icon"
          draggable="false"
          alt="Search Icon Above Drag N Drop"
        />
        <div id="text" class="no-select">Drag N Drop</div>
      </div>
    </div>
  </div>
</div>

<style>
  #drop_system {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 93vh;
  }

  #dropper_ui {
    background-color: #1a5319;
    height: 350px;
    width: 350px;
    border-radius: 50px;
    margin: 0 auto;
    box-shadow: 0 0 30px #5eb95b;
    transition: box-shadow 0.2s ease-in-out;
  }

  #upload {
    position: absolute;
    opacity: 0;
    height: 350px;
    width: 350px;
    border-radius: 50px;
    margin: 0 auto;
    cursor: pointer;
  }

  #upload:hover ~ #dropper_ui {
    box-shadow: 0 0 50px #5eb95b;
  }

  #border {
    margin-top: 20px;
    margin-left: 25px;
    border-radius: 20px;
    height: 80%;
    width: 80%;
    background-color: transparent;
    border: 10px #508d4e dotted;
  }

  /* Center Data Of The Box */
  #center_data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  #text {
    font-size: 1.5vh;
    font-family: "Ubuntu", sans-serif;
    font-weight: 800;
    margin: 0 auto;
    color: whitesmoke;
  }

  #search_icon {
    margin-bottom: 10px;
  }
</style>
