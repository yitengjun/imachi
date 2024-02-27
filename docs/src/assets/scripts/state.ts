import { writable, type Writable } from "svelte/store";

export const loadedImageCount: Writable<number> = writable(0);
export const loadingPercentage: Writable<number> = writable(0);

export const imachiStatus: Writable<"init" | "progress" | "done" | "fail"> =
  writable("init");

export const currentHoveredImage: Writable<number | null> = writable(null);
