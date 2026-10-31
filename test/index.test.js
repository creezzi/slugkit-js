import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify, uniqueSlug } from "../src/index.js";

const cases = [
  ["Hello, World!", "hello-world"],
  ["Crème Brûlée & Friends!", "creme-brulee-friends"],
  ["  --Already--slugged--  ", "already-slugged"],
  ["Straße Œuvre", "strasse-oeuvre"],
  ["under_score and CamelCase", "under-score-and-camelcase"],
  ["日本語", ""],
  ["", ""],
];

for (const [input, expected] of cases) {
  test(`slugify(${JSON.stringify(input)})`, () => {
    assert.equal(slugify(input), expected);
  });
}

test("custom separator", () => {
  assert.equal(slugify("a b c", { separator: "_" }), "a_b_c");
  assert.equal(slugify("a b c", { separator: "." }), "a.b.c");
});

test("maxLength cuts on a word boundary", () => {
  assert.equal(slugify("the quick brown fox", { maxLength: 12 }), "the-quick");
  assert.equal(slugify("supercalifragilistic", { maxLength: 5 }), "super");
});

test("uniqueSlug", () => {
  assert.equal(uniqueSlug("post", new Set()), "post");
  assert.equal(uniqueSlug("post", new Set(["post"])), "post-2");
  assert.equal(uniqueSlug("post", ["post", "post-2", "post-3"]), "post-4");
});
