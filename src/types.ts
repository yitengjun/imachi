export type TElement = string | HTMLElement | HTMLElement[] | NodeList | HTMLCollection;

export interface LoadedImages {
  src: string;
  element: HTMLImageElement;
}

export interface ProgressEvent {
  src: string;
  element: HTMLImageElement;
  progress: {
    count: number;
    percentage: number;
    total: number;
  };
}

export interface ErrorEvent {
  src: string;
  element: HTMLImageElement;
  error: Error;
}

export interface DoneEvent {
  images: LoadedImages[];
  total: number;
}
