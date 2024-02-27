<script lang="ts">
  import { loadingPercentage, imachiStatus } from "../assets/scripts/state.js";
  import { gsap } from "gsap";

  const percentState = { progress: 0 };
  let percent = 0;

  loadingPercentage.subscribe((value) => {
    gsap.to(percentState, {
      progress: value,
      duration: 0.2,
      onUpdate: () => {
        percent = Math.floor(percentState.progress);
      },
    });
  });
</script>

<div class="lower">
  <div class="status" data-status={$imachiStatus}>
    {#if $imachiStatus === "init"}
      <p>ready to start</p>
    {:else if $imachiStatus === "progress"}
      <p>loading image...</p>
    {:else if $imachiStatus === "done"}
      <p>image loaded successfully</p>
    {:else if $imachiStatus === "fail"}
      <p>fail to load image</p>
    {/if}
  </div>
  <div class="progress">
    <div class="value">{percent}</div>
    <div class="unit">%</div>
  </div>
</div>

<style lang="scss">
  @use "../assets/styles/config/config" as v;

  .lower {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .progress {
    display: flex;
    column-gap: 8px;
    align-items: flex-end;

    .value {
      padding-bottom: v.vh(40px);
      font-size: v.vh(171px);
      line-height: v.vh(114px);
    }

    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      font-size: 13px;
      color: var(--color-bg);
      text-align: center;
      background-color: var(--color-text);
    }
  }

  .status {
    width: v.vh(307px);

    //  padding: 0 v.vh(8px);
    margin-top: v.vh(24px);
    margin-bottom: v.vh(40px);

    &[data-status] {
      display: flex;
      column-gap: v.vh(8px);
      align-items: center;
      font-size: 13px;

      &::before {
        display: block;
        width: 8px;
        height: 8px;
        content: "";
        background-color: var(--color-text);
        border-radius: 50%;
      }
    }

    &[data-status="fail"] {
      color: var(--color-bg);
      background-color: #e61c1c;

      &::before {
        background-color: var(--color-bg);
      }
    }
  }
</style>
