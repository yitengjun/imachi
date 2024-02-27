## `imachi` 🌖

Installation:
```bash
# yarn
yarn add -D imachi
# npm
npm install -D imachi
# pnpm
pnpm i -D imachi
```

Import:
```js
import { imachi } from "imachi";
```

Usage:
```js
const loader = imachi('img');

// progress
loader.progress((event) => {
  console.log(`Loading progress: ${event.progress.percentage}%`);
});

// done
loader.done((event) => {
  console.log(`All images loaded: ${event.total} images`);
});

// fail
loader.fail((event) => {
  console.error(`Failed to load image: ${event.src}`);
});
```

## Events

**`.progress`**

Called each time an image loads successfully.
```js
const loader = imachi('img');

loader.progress((event) => {
  console.log(`Loading progress: ${event.progress.percentage}%`);
});
```

- `imageElement`: `HTMLImageElement` - Loaded image
- `progress`
  - `count`: `number` - Current count
  - `percentage`: `number` - Load completion (%)
  - `total`: `number` - Total count

---

**`.done`**

Called when the entire loader process finishes.
```js
const loader = imachi('img');

loader.done((event) => {
  console.log(`All images loaded: ${event.total} images`);
});
```
- `images`: `[]` - Loaded images
  - `src`: `string` - Image source
  - `element`: `HTMLImageElement` - Image element
- `total`: `number` - Total count

---

**`.fail`**

Called when an image fails to load.
```js
const loader = imachi('img');

loader.fail((event) => {
  console.error(`Failed to load image: ${event.src}`);
});
```
- `src`: `string` - Image source
- `element`: `HTMLImageElement` - Image element
- `error`: `Error` - Error object
