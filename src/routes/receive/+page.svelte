<script lang="ts">
  import PocketBase from "pocketbase";
  const pb = new PocketBase("http://127.0.0.1:8090");
  import { onMount } from "svelte";

  onMount(() => {
    const submitButton = document.getElementById("submit");
    if (submitButton) {
      submitButton.addEventListener("click", puller);
    }
  });

  async function puller() {
    try {
      let input_data = document.getElementById("file-id") as HTMLInputElement;
      const record = await pb.collection("Files").getOne(input_data.value);
      const get = `http://127.0.0.1:8090/api/files/${record.collectionId}/${record.id}/${record.file}`;

      // To-Do: Selection For Randomazition Of Download File Name
      const response = await fetch(get);
      const blob = await response.blob();

      const temp = document.createElement("a");
      temp.href = URL.createObjectURL(blob);
      temp.download = record.file;

      temp.click();
      URL.revokeObjectURL(temp.href);
    } catch (error) {
      const error_code = error instanceof Error ? error.message : String(error);

      notify(error_code, 5000);
    }
  }

  // Notification Section
  function notify(message: string, time: number) {
    const box = document.getElementById("notify") as HTMLElement;
    box.style.opacity = "1";
    box.textContent = message;

    setTimeout(() => {
      box.style.opacity = "0";
    }, time);
  }
</script>

<body>
  <div id="container">
    <div id="title">Receive Page | Powered By ShareDRP</div>
    <div class="row">
      <input
        id="file-id"
        type="text"
        maxlength="15"
        placeholder="Enter File ID"
        autocomplete="off"
        alt="Input Field Used For Finding The File ID"
      />
      <button id="submit">Submit</button>
    </div>
    <div id="notification-box">
      <div id="notify"></div>
    </div>
  </div>
</body>

<!-- To-Do: Add Custom Selection Style To Match The Page -->

<style>
  :global(body) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #d6efd8;
  }

  #title {
    font-size: 2rem;
    color: #333;
    user-select: none;
  }

  .row {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
  }

  #file-id {
    width: 300px;
    padding: 10px;
    font-size: 1rem;
    text-align: center;
    border-radius: 5px;
    border: 2px solid #333;
    outline: none;
  }

  /* Submit Button */
  #submit {
    padding: 10px 20px;
    font-size: 1rem;
    margin-left: 10px;
    cursor: pointer;
    background-color: transparent;
    color: black;
    font-weight: 500;
    border-radius: 5px;
    border: 2px solid #333;
    transition: all 0.2s;
  }

  #submit:hover {
    background-color: #33333321;
  }

  /* Notification Section */
  #notification-box {
    display: flex;

    margin-top: 5px;
    transition: all 0.2s;

    justify-content: center;
    width: auto;
  }

  #notify {
    font-size: 1rem;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    opacity: 0;
    padding: 10px 20px;

    background-color: transparent;
    color: black;
    font-weight: 500;
    border-radius: 5px;
    border: 2px solid #333;
    transition: all 0.2s;

    user-select: none;
    justify-content: center;
    align-items: center;
    width: auto;
  }
</style>
