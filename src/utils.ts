import type { TElement } from "./types";

export const convertToElementArray = (elements: TElement): HTMLElement[] => {
  if (Array.isArray(elements)) return elements;
  if (typeof elements === "string") return Array.from(document.querySelectorAll<HTMLElement>(elements));
  if (elements instanceof HTMLElement) return [elements];
  if (elements instanceof NodeList || elements instanceof HTMLCollection) return Array.from(elements) as HTMLElement[];

  throw new Error("Invalid type for elements");
};
