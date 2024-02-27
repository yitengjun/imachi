import { convertToElementArray } from "./utils";
import type { TElement, LoadedImages, ProgressEvent, ErrorEvent, DoneEvent } from "./types";

type DoneCallback = (event: DoneEvent) => void;
type ErrorCallback = (event: ErrorEvent) => void;
type ProgressUpdateCallback = (event: ProgressEvent) => void;

interface IImachi {
  done: (callback: DoneCallback) => void;
  fail: (callback: ErrorCallback) => void;
  progress: (callback: ProgressUpdateCallback) => void;
}

export function imachi(elements: TElement | null): IImachi | null {
  if (!elements) {
    throw new Error(`The argument 'elements' is null.`);
  }

  let doneCallback: DoneCallback;
  let failedCallback: ErrorCallback;
  let progressCallback: ProgressUpdateCallback;
  let loadedCount = 0;

  const imageElements = convertToElementArray(elements);
  const imageSources = imageElements.flatMap((element) => {
    if (element.nodeName !== "IMG") return [];
    if (element.getAttribute("loading") === "lazy") return [];

    const path = element.getAttribute("src");
    if (path !== null && path !== "") {
      return [{ path: path, element: element as HTMLImageElement }];
    } else {
      return [];
    }
  });

  if (imageSources.length === 0) {
    console.error("Error: No valid images found.");
    return null;
  }

  const loadedImages: LoadedImages[] = [];

  const decodeImage = ({ path, element }: { path: string; element: HTMLImageElement }) => {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.src = path;

      image
        .decode()
        .then(() => {
          loadedImages.push({
            src: path,
            element,
          });

          if (progressCallback) {
            loadedCount++;
            const percent = Math.round((loadedCount / imageSources.length) * 100);

            progressCallback({
              src: path,
              element,
              progress: {
                count: loadedCount,
                percentage: percent,
                total: imageSources.length,
              },
            });
          }

          resolve();
        })
        .catch((error) => {
          if (failedCallback) {
            let consoleText;

            if (error instanceof DOMException) {
              consoleText = `Encoding error for image ${path}: ${error.message}`;
            } else {
              consoleText = `Unknown error for image ${path}: ${error.message}`;
            }

            failedCallback({
              src: path,
              element,
              error: new Error(consoleText),
            });
          }

          reject();
        });
    });
  };

  const promises = imageSources.map(decodeImage);

  Promise.allSettled(promises).then(() => {
    if (doneCallback) {
      doneCallback({
        images: loadedImages,
        total: imageSources.length,
      });
    }
  });

  return {
    done: (callback) => {
      doneCallback = callback;
    },
    fail: (callback) => {
      failedCallback = callback;
    },
    progress: (callback) => {
      progressCallback = callback;
    },
  };
}
