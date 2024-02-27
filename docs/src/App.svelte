<script lang="ts">
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Detail from "./components/Detail.svelte";
  import Gallery from "./components/Gallery.svelte";
  import Lower from "./components/Lower.svelte";

  import "@fontsource/inconsolata";
</script>

<Header />

<main class="main">
  <div class="upper">
    <ul class="th">
      <li data-col="1">#</li>
      <li data-col="2">(S)</li>
      <li data-col="3">(d)</li>
      <li data-col="4">(l)</li>
      <li data-col="5">(l)</li>
    </ul>

    <div class="container">
      <Detail />

      <Gallery />
    </div>
  </div>

  <Lower />
</main>

<Footer />

<style lang="scss">
  @use "./assets/styles/config/config" as v;

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - (var(--height-header) + var(--height-footer)));
    padding-right: var(--content-width-margin);
    padding-left: var(--content-width-margin);
  }

  .th {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    height: var(--height-th);
    text-transform: uppercase;
  }

  .container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(24, 1fr);

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: calc(
        100vh - (var(--height-header) + var(--height-footer) + var(--height-th))
      );
      pointer-events: none;
      content: "";
      border-top: 1px solid;
      border-right: 1px solid;
      border-radius: 0 v.vh(16px) 0 0;
    }
  }
</style>
