<script lang="ts">
  const user_public_ip = __Network_IP__ + ":5173";
</script>

<head>
  <!-- Navbar Title -->
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
</head>

<div id="bar">
  <h1 class="no-select">
    Share Server | URL: <a
      id="network_url"
      href="http://{user_public_ip}"
      target="_blank">{user_public_ip}</a
    >
  </h1>
</div>

<style>
  #bar {
    display: flex;
    height: auto;
    margin: 0 auto;
    padding-left: 10px;
    padding-right: 10px;
    width: 25%;
    border-radius: 25px;
    border: 4px solid rgb(114, 114, 114);
    backdrop-filter: blur(15px);
    justify-content: center;
  }
  h1 {
    color: black;
    font-weight: 600;
    text-align: center;
    font-size: 1rem;
    font-family: "Open Sans", sans-serif;
  }
  #network_url {
    color: rgb(0, 132, 255);
    font-weight: 900;
    text-decoration: none;
  }
</style>
