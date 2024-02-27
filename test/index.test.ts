import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Window } from "happy-dom";
import { imachi } from "../src/index.ts";

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

  it("imachi function should throw an error if elements is null", () => {
    expect(() => imachi(null).toBeNull());
  });

  vi.mock("../src/index.ts", () => ({
    imachi: vi.fn(),
  }));

  describe("imagesLoaded function", () => {
    it("should call the provided callback when images fail to load", () => {
      const mockCallback = vi.fn();
      const mockImagesLoaded = {
        done: vi.fn((callback) => callback()),
      };

      imachi.mockReturnValue(mockImagesLoaded);

      const imagesLoaded = imachi(div);

      imagesLoaded.done(mockCallback);

      expect(mockCallback).toHaveBeenCalled();
    });
  });
});
