<script lang="ts">
  import "@fontsource/space-grotesk/300.css";
</script>

<header class="header">
  <h1 class="title">
    <span class="sub">ytngjn/</span>
    <span class="main">imachi</span>
  </h1>
</header>

<style lang="scss">
  @use "../assets/styles/config/config" as v;

  .title {
    display: flex;
    column-gap: v.vh(24px);
    align-items: flex-start;
    height: v.vh(156px);
    padding-top: v.vh(40px);
    padding-left: var(--content-width-margin);
    line-height: 1;

    .sub {
      font-size: v.vh(13px);
    }

    .main {
      font-family: var(--font-serif);
      font-size: v.vh(51px);
      font-weight: 300;
      line-height: v.vh(36px);
      text-transform: uppercase;
      letter-spacing: -#{v.vh(2.55px)};
    }
  }
</style>
