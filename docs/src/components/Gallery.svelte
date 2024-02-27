<script lang="ts">
  import { onMount } from "svelte";
  import { images } from "../assets/scripts/imageData.js";
  import { imachi } from "../../../src/index";
  import {
    loadedImageCount,
    loadingPercentage,
    imachiStatus,
    currentHoveredImage,
  } from "../assets/scripts/state.js";
  import {
    onMouseEnter,
    onMouseLeave,
  } from "../assets/scripts/currentImageEvents.js";

  // const loadedImageStates = images.map(() => false);

  // images.forEach((image) => {
  //   image.isLoaded.subscribe((value) => {
  //     if (value) {
  //       loadedImageStates[image.id] = true;
  //     }
  //   });
  // });

  onMount(async () => {
    const imagesLoaded = imachi("[data-js-image-load]");

    imagesLoaded?.done((e) => {
      if ($imachiStatus === "fail") {
        return;
      }
      imachiStatus.set("done");

      console.table(e.images);
      console.log("All images successfully loaded");
    });

    imagesLoaded?.progress((e) => {
      if ($imachiStatus === "fail") {
        return;
      }
      const elementId = e.element.getAttribute("data-id");
      const found = images.find((image) => image.id === Number(elementId));

      if (found) {
        found.isLoaded.set(true);
        loadedImageCount.update((n) => n + 1);
      }

      loadingPercentage.set(e.progress.percentage);
      imachiStatus.set("progress");

      console.log(e);
    });

    imagesLoaded?.fail((e) => {
      imachiStatus.set("fail");

      console.log("fail to load images", e);
    });
  });
</script>

<div class="gallery">
  <ul class="list">
    {#each images as { id, src, decoding, loading }, index}
      <li class="item">
        <figure
          class="thumbnail"
          class:is-loaded={images[index].isLoaded}
          class:is-current={id === $currentHoveredImage}
        >
          <img
            {src}
            {decoding}
            {loading}
            alt=""
            data-id={id}
            data-js-image-load
            on:mouseenter={onMouseEnter}
            on:mouseleave={onMouseLeave}
          />
          <figcaption>{id + 1}</figcaption>
        </figure>
      </li>
    {/each}
    <li class="item">
      <figure class="icon">
        <img src="/arrow.svg" alt="" />
      </figure>
    </li>
  </ul>
</div>

<style lang="scss">
  @use "../assets/styles/config/config" as v;

  .gallery {
    grid-column: 14 / span 11;
  }

  .list {
    --gap: #{v.vh(20px)};

    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(calc(100% / 6 - var(--gap)), 1fr)
    );
    grid-gap: var(--gap);
    padding-top: v.vh(40px);
    padding-right: v.vh(40px);
  }

  .item {
    &:nth-child(17) {
      .thumbnail {
        &::before {
          border-radius: 0;
        }

        img {
          border-radius: 0 0 9999px;
        }
      }
    }
  }

  .thumbnail {
    position: relative;
    cursor: pointer;

    &.is-loaded {
    }

    &.is-current {
      img {
        filter: grayscale(0);
      }

      figcaption {
        // color: var(--color-bg);
        // background-color: var(--color-text);
      }
    }

    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;
      width: calc(100% - 1px);
      height: calc(100% - 1px);
      content: "";
      border: 1px dashed var(--color-border);
      border-radius: v.vh(16px) 0 0 0;
      transform: translate(-50%, -50%);
    }

    figcaption {
      position: relative;
      font-size: 13px;
      color: var(--color-border);
      text-align: center;

      &::after {
        position: absolute;
        top: 0;
        left: 50%;
        width: calc(100% - 1px);
        height: 100%;
        content: "";
        border-top: 1px dashed var(--color-border);
        border-radius: 0 0 v.vh(8px) v.vh(8px);
        transform: translateX(-50%);
      }
    }

    img {
      width: 100%;
      max-width: 100%;
      height: v.vh(117px);
      max-height: 100%;
      filter: grayscale(1);
      border-radius: v.vh(16px) 0 0 0;
      object-fit: cover;
    }
  }

  .icon {
    position: relative;
    height: 100%;

    img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: v.vh(16px);
      height: v.vh(16px);
    }
  }
</style>
