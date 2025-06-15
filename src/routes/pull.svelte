<script>
  import PocketBase from "pocketbase";
  const pb = new PocketBase("http://127.0.0.1:8090");

  const base_url = new URL(window.location.href).searchParams;
  const key_check = base_url.get("s") || "Banned URL";

  async function puller() {
    const record = await pb.collection("Files").getOne(key_check);
    const get_img = `http://127.0.0.1:8090/api/files/${record.collectionId}/${record.id}/${record.file}`;

    // To-Do: Selection For Randomazition Of Download File Name
    const response = await fetch(get_img);
    const blob = await response.blob();

    const temp = document.createElement("a");
    temp.href = URL.createObjectURL(blob);
    temp.download = record.file;

    temp.click();
    URL.revokeObjectURL(temp.href);
  }

  puller();
</script>
