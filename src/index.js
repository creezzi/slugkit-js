const SPECIAL = { ß: "ss", æ: "ae", Æ: "AE", ø: "o", Ø: "O", œ: "oe", Œ: "OE", đ: "d", Đ: "D", ł: "l", Ł: "L" };

/**
 * @param {string} text
 * @param {{separator?: string, maxLength?: number}} [options]
 */
export function slugify(text, { separator = "-", maxLength = 0 } = {}) {
  const sep = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let slug = [...String(text)].map((c) => SPECIAL[c] ?? c).join("")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^(?:${sep})+|(?:${sep})+$`, "g"), "");

  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.slice(0, maxLength);
    const cut = slug.lastIndexOf(separator);
    if (cut > 0) slug = slug.slice(0, cut);
    slug = slug.replace(new RegExp(`(?:${sep})+$`), "");
  }
  return slug;
}

/** Append -2, -3, ... until the slug is not in `taken` (a Set or array). */
export function uniqueSlug(base, taken, separator = "-") {
  const has = (s) => (taken instanceof Set ? taken.has(s) : taken.includes(s));
  if (!has(base)) return base;
  let n = 2;
  while (has(`${base}${separator}${n}`)) n++;
  return `${base}${separator}${n}`;
}
