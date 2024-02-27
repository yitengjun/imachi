import { get } from "svelte/store";
import { imachiStatus, currentHoveredImage } from "./state.js";
export const onMouseEnter = (e: Event) => {
  const state = get(imachiStatus);
  if (state !== "done") return;
  const targetElement = e.target as Element;
  if (targetElement) {
    const elementId = targetElement.getAttribute("data-id");
    currentHoveredImage.set(Number(elementId));
  }
};

export const onMouseLeave = () => {
  const state = get(imachiStatus);

  if (state !== "done") return;
  currentHoveredImage.set(null);
};
