# slugkit

URL-safe slugs with Unicode folding, length limits and unique-slug helpers.

## Usage

```js
import { slugify, uniqueSlug } from "slugkit";

slugify("Crème Brûlée & Friends!");   // "creme-brulee-friends"
uniqueSlug("post", new Set(["post"])); // "post-2"
```

## Test

```bash
npm test
```

## License

MIT
