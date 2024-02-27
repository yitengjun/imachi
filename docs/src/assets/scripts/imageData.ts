import { writable, type Writable } from "svelte/store";

export interface Image {
  id: number;
  src: string;
  decoding: "auto" | "async" | "sync" | null | undefined;
  loading: "eager" | "lazy" | null | undefined;
  isLoaded: Writable<boolean>;
}

export const images: Image[] = [];

const count = 17;

for (let i = 0; i < count; i++) {
  const id = Math.floor(Math.random() * 70) + 1;
  const sizeArray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const size = sizeArray[Math.floor(Math.random() * sizeArray.length)];

  const src = `https://picsum.photos/id/${id}/${size}`;

  images.push({
    id: i,
    src: src,
    decoding: "auto",
    loading: null,
    isLoaded: writable(false),
  });
}
