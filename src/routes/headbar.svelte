<script lang="ts">
  let DRP_Powered = "<DrPanayioths/>";
</script>

<head>
  <!-- Navbar Title -->
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
</head>

<div id="bar">
  <h1 class="no-select">Share Server | Powered By {DRP_Powered}</h1>
</div>

<style>
  #bar {
    display: flex;
    height: auto;
    width: auto;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(15px);
    justify-content: center;
  }
  h1 {
    color: #3d3d3d;
    font-weight: 600;
    text-align: center;
    font-size: 1.5em;
    font-family: "Open Sans", sans-serif;
  }

  /* Property Classes */
  .no-select {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
  }
</style>
