<!-- To-Do: Add Notification About File Status -->
<!-- To-Do: Add A Copy Link & Copy Code in the right collum system -->

<script lang="ts">
  import { onMount } from "svelte";
  import PocketBase from "pocketbase";
  import searchPng from "$lib/search.svg";
  import Copy from "$lib/Copy.png";
  import { goto } from "$app/navigation";

  // File Upload System
  const pb = new PocketBase("http://127.0.0.1:8090");
  let input: HTMLInputElement | null = null;

  onMount(() => {
    input = document.getElementById("upload") as HTMLInputElement;
  });

  // Notification Function
  function notify(id: string) {
    const notify_box = document.getElementById("notify_box");
    const notify_text = document.getElementById("notify_id");
    notify_box!.style.opacity = "1";
    notify_box!.style.visibility = "visible";
    notify_text!.textContent = id;

    setTimeout(() => {
      notify_box!.style.opacity = "0";
      notify_box!.style.visibility = "collapse";
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
        const test = await fetch("http://127.0.0.1:8090/api/health");
        const response_data = await test.json();

        // Sucess Rate System
        let current = parseInt(
          sessionStorage.getItem("successful_transfers") ?? "0"
        );
        let up = (current ?? 0) + 1;
        let up_final = up.toString();
        sessionStorage.setItem("successful_transfers", up_final);

        // To-Do: Think about the idea to reset on failed Transfer
      } catch {
        // To-Do: Add Custom Notification System For The Error
        alert(
          "💻 Pocketbase is offline! Run ./pocketbase serve in terminal to start the service 💻"
        );

        setTimeout(() => {
          console.clear();
        }, 3000);
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

  function route(url: string) {
    let now = window.location.href;
    goto("/receive");
  }
</script>

<!-- Drag And Drop Font -->
<link
  href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
  rel="stylesheet"
/>
<!-- [File ID] Text Font -->
<link
  href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
  rel="stylesheet"
/>

<div id="drop_system">
  <input
    id="upload"
    type="file"
    multiple
    onchange={upload_sequence}
    class="no-select"
  />
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
      <button
        id="receive_button"
        class="no-select"
        onclick={() => route("Receive")}>Receive</button
      >

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
    height: 90vh;
  }

  #dropper_ui {
    height: 300px;
    width: 300px;
    border-radius: 50px;
    transition: box-shadow 0.2s ease-in-out;
    backdrop-filter: blur(10px);
  }

  #upload {
    position: absolute;
    opacity: 0;
    z-index: 50;
    height: 350px;
    width: 350px;
    border-radius: 50px;
    margin: 0 auto;
    cursor: pointer;
  }

  #upload:hover ~ #dropper_ui {
    backdrop-filter: blur(50px);
  }

  #border {
    margin-top: 25px;
    margin-left: 25px;
    border-radius: 30px;
    height: 80%;
    width: 80%;
    background-color: transparent;
    border: 5px #494b49 dashed;
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
    color: black;
  }

  #search_icon {
    margin-bottom: 10px;
    height: 2rem;
  }

  /* Notify System */
  #notify_section {
    display: flex;
    flex-direction: column;
    gap: 50px;
    height: 10vw;
    width: auto;
    transition: all 0.5s;
  }

  #notify_box {
    background-color: #494b4956;
    backdrop-filter: blur(50px);
    padding: 5px;
    height: 4vh;

    border-radius: 50px;
    padding-left: 20px;
    padding-right: 20px;
    opacity: 0;
    visibility: collapse;

    align-self: flex-end;
    margin: 0 auto;
    border: 4px solid rgba(0, 0, 0, 0.301);
    box-shadow: 2px 4px 2px rgb(114, 114, 114);
  }

  .notify_text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vh;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    font-weight: 500;
    user-select: none;
    font-family: "Ubuntu", sans-serif;
    font-weight: 800;
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
    cursor: pointer;
  }

  #copy_fileid {
    height: 1.8vh;
    align-self: flex-end;
    transition: 0.5s;
  }

  #copy_fileid:hover {
    transform: scale(1.2);
  }

  ::selection {
    background-color: rgba(0, 0, 0, 0.26);
  }

  /* Settings Menu */
  #receive_button {
    color: black;
    background-color: transparent;
    border: 3px solid black;
    box-shadow: 2px 3px 2px rgb(107, 107, 107);
    font-size: 2vh;
    cursor: pointer;
    transition: all 0.5s;

    margin: 0 auto;
    margin-top: 2.5vh;
    border-radius: 25px;
    font-family: "Ubuntu", sans-serif;
    width: min-content;

    padding-top: 2vh;
    padding-bottom: 2vh;
    padding-left: 5vh;
    padding-right: 5vh;
  }

  #receive_button:hover {
    background-color: rgba(172, 172, 172, 0.267);
  }
</style>
