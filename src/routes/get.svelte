<!-- To-Do: Add Notification About File Status -->
<!-- To-Do: Add A Copy Link & Copy Code in the right collum system -->

<script lang="ts">
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";
  import searchPng from "$lib/search.png";
  import Copy from "$lib/Copy.png";

  // File Upload System

  const pb = new PocketBase("http://127.0.0.1:8090");
  let input: HTMLInputElement | null = null;

  onMount(() => {
    input = document.getElementById("upload") as HTMLInputElement;
  });

  // Notification Function
  function notify(id: string) {
    const notify_box = document.getElementById("notify_section");
    const notify_text = document.getElementById("notify_id");
    notify_box!.style.opacity = "1";
    notify_text!.textContent = id;

    setTimeout(() => {
      notify_box!.style.opacity = "0";
    }, 10000);
  }

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
      // Check For Pocketbase Status
      try {
        const test = await fetch("http://127.0.0.1:8090/");
        const response_data = await test.json();

        // Sucess Rate System
        let current = parseInt(
          sessionStorage.getItem("successful_transfers") ?? "0"
        );
        let up = (current ?? 0) + 1;
        let up_final = up.toString();
        sessionStorage.setItem("successful_transfers", up_final);
        console.log(sessionStorage.getItem("successful_transfers"));

        // To-Do: Think about the idea to reset on failed Transfer
      } catch {
        // To-Do: Add Custom Notification System For The Error
        alert("Pocketbase Is Not Started");
        console.clear();
      }

      await pb.collection("Files").create(data);
    } else {
      console.error("No file selected");
    }

    // Notification Send
    notify(id);
  }

  function function_copy() {
    let data = document.getElementById("notify_id");
    navigator.clipboard.writeText(data?.textContent || "No File Id Found");
  }
</script>

<!-- Drag And Drop Font -->
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
  rel="stylesheet"
/>
<!-- [File ID] Title Font -->
<link
  href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&display=swap"
  rel="stylesheet"
/>
<!-- [File ID] Text Font -->
<link
  href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
  rel="stylesheet"
/>

<div id="drop_system">
  <input id="upload" type="file" multiple onchange={upload_sequence} />
  <div id="dropper_ui">
    <div id="border">
      <div id="center_data">
        <img
          src={searchPng}
          class="no-select"
          id="search_icon"
          draggable="false"
          alt="Search Icon Of The Drag N Drop Box"
        />
        <div id="text" class="no-select">Drag N Drop</div>
      </div>
    </div>
    <div id="notify_section">
      <div id="notify_box">
        <div class="notify_text">
          File ID:<span id="notify_id">wdh2hjdhg</span>

          <button id="function_copy_button" onclick={function_copy}>
            <img
              src={Copy}
              class="no-select"
              id="copy_fileid"
              draggable="false"
              alt="Copy File ID Icon"
            />
          </button>
        </div>
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

  /* Notify System */
  #notify_section {
    opacity: 0;
    display: flex;
    height: 10vw;
    width: auto;
    transition: all 0.5s;
  }

  #notify_box {
    background-color: #439946;
    padding: 5px;
    height: 4vh;
    width: 50vh;
    border-radius: 50px;

    align-self: flex-end;
    margin: 0 auto;
    border: 4px solid #3e8e41;
    box-shadow:
      rgba(58, 58, 58, 0.25) 0px 54px 55px,
      rgba(58, 58, 58, 0.12) 0px -12px 30px,
      rgba(58, 58, 58, 0.12) 0px 4px 6px,
      rgba(58, 58, 58, 0.17) 0px 12px 13px,
      rgba(58, 58, 58, 0.09) 0px -3px 5px;
  }

  .notify_text {
    display: flex;
    justify-content: center;
    color: #ffffff;
    margin-top: 15px;
    font-family: "Bitcount Grid Double", system-ui;
    font-weight: 500;
    user-select: none;
  }

  #notify_id {
    margin-left: 5px;
    font-family: "PT Sans", sans-serif;
    font-weight: 500;
    letter-spacing: 1px;
    color: #ffffff;
    user-select: text;
  }

  #function_copy_button {
    border: none;
    background-color: transparent;
  }

  #copy_fileid {
    height: 2vh;
    align-self: flex-end;
    margin-left: 5px;
    transition: 0.5s;
  }

  #copy_fileid:hover {
    transform: scale(1.2);
  }

  ::selection {
    background-color: rgb(24, 121, 0);
  }
</style>
