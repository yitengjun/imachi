<script lang="ts">
  import "@fontsource/space-grotesk/300.css";
</script>

<footer class="footer">
  <div class="inner">
    <span class="name">IM2311_04W01</span>
    <span class="copy">
      <a href="https://ytng.dev" target="_blank" rel="noopener noreferrer"
        >(Y)</a
      >
    </span>
    <span class="link">
      <a
        href="https://github.com/yitengjun/imachi"
        target="_blank"
        rel="noopener noreferrer">GitHub</a
      >
    </span>
  </div>
</footer>

<style lang="scss">
  @use "../assets/styles/config/config" as v;

  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: calc(100% - var(--content-width-margin));
    height: var(--height-footer);
    padding: 0 var(--content-width-margin);
    font-weight: 300;
    border-top: 1px dashed;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .name {
    font-family: var(--font-serif);
  }
</style>
