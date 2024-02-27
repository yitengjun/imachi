import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { Window } from "happy-dom";
import { convertToElementArray } from "../src/utils";

describe("convertToElementArray", () => {
  let window;
  let document;
  let div;

  beforeEach(() => {
    window = new Window();
    document = window.document;
    div = document.createElement("div");
  });

  afterEach(() => {
    window = null;
    document = null;
    div = null;
  });

  it("should return an array of elements when passed an array", () => {
    const elements = [div, div];
    expect(convertToElementArray(elements)).toEqual(elements);
  });

  it("should return an array of elements when passed a selector string", () => {
    document.body.innerHTML = `<div id="test" class="test"></div>`;
    document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll("#test");
      expect(convertToElementArray("#test")).toEqual(elements);
      expect(convertToElementArray(".test")).toEqual(elements);
    });
  });

  it("should return an array with a single element when passed an HTMLElement", () => {
    document.addEventListener("DOMContentLoaded", () => {
      expect(convertToElementArray(div)).toEqual([div]);
    });
  });

  it("should return an array of elements when passed a NodeList", () => {
    const elements = [div, div];
    const nodeList = elements.map((element) => element);
    expect(convertToElementArray(nodeList)).toEqual(elements);
  });

  it("should return an array of elements when passed an HTMLCollection", () => {
    document.body.innerHTML = `
    <div class="test"></div>
    <div class="test"></div>
    <div class="test"></div>
    `;
    document.addEventListener("DOMContentLoaded", () => {
      const collection = document.getElementsByClassName(".test");
      expect(convertToElementArray(collection)).toEqual(collection);
    });
  });
});
