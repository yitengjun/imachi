<script lang="ts">
  import { images } from "../assets/scripts/imageData.js";
  import { loadedImageCount, currentHoveredImage } from "../assets/scripts/state.js";
  import {
    onMouseEnter,
    onMouseLeave,
  } from "../assets/scripts/currentImageEvents.js";
  import { gsap } from "gsap";

  const loadedImageCountStates = { count: 0 };
  let loaded = 0;

  const loadedImageStates = images.map(() => false);

  images.forEach((image) => {
    image.isLoaded.subscribe((value) => {
      if (value) {
        loadedImageStates[image.id] = true;
      }
    });
  });

  loadedImageCount.subscribe((value) => {
    gsap.to(loadedImageCountStates, {
      count: value,
      duration: 0.15,
      onUpdate: () => {
        loaded = Math.floor(loadedImageCountStates.count);
      },
    });
  });
</script>

<div class="detail">
  <ol class="items">
    {#each images as { id, src, decoding, loading }, index}
      <li
        class="item"
        class:is-current={id === $currentHoveredImage}
        data-id={id}
        on:mouseenter={onMouseEnter}
        on:mouseleave={onMouseLeave}
      >
        <span data-col="1">{index + 1}</span>
        <span data-col="2">{src}</span>
        <span data-col="3">{decoding}</span>
        <span data-col="4">{loading}</span>
        <span class="bg" data-bg={loadedImageStates[index]} data-col="5"
          >{loadedImageStates[index] ? "true" : "false"}</span
        >
      </li>
    {/each}
  </ol>

  <div class="count">
    <div class="block">
      <span class="title">(c)</span>
      <span class="value">{loaded}</span>
    </div>
    <div class="block">
      <span class="title">(t)</span>
      <span class="value">{images.length}</span>
    </div>
  </div>
</div>

<style lang="scss">
  @use "../assets/styles/config/config" as v;

  .detail {
    grid-column: 1 / span 11;
    border-spacing: 0 v.vh(8px);
    border-collapse: separate;
  }

  .items {
    padding-top: v.vh(16px);
  }

  .item {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    align-items: center;
    padding: v.vh(4px) 0;
    cursor: pointer;

    &.is-current {
      color: var(--color-bg);
      background-color: var(--color-text);
    }

    &:not(:first-of-type) {
      // margin-top: v.vh(8px);
    }

    [data-bg] {
      position: relative;
      padding: 2px 0;
      text-align: center;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        border: 1px dashed var(--color-border);
      }
    }

    [data-bg="false"] {
      color: var(--color-border);
    }

    [data-bg="true"] {
      color: var(--color-bg);
      background-color: var(--color-text);

      &::after {
        opacity: 0;
      }
    }
  }

  .count {
    display: flex;
    column-gap: v.vh(40px);
    align-items: flex-start;
    padding-top: v.vh(24px);
    margin-top: v.vh(24px);
    border-top: 1px dashed;

    .block {
      display: flex;
      column-gap: v.vh(8px);
      align-items: flex-start;
      min-width: v.vh(77px);
    }

    .title {
      font-size: v.vh(12px);
      text-transform: uppercase;
    }

    .value {
      font-size: v.vh(33px);
    }
  }
</style>
