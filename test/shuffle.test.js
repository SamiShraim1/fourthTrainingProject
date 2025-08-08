import { strict as assert } from "assert";
import { shuffle } from "../src/shuffle.js";

describe("shuffle()", () => {
  it("returns a new array with same elements and length", () => {
    const original = [
      { term: "A", description: "a" },
      { term: "B", description: "b" },
      { term: "C", description: "c" }
    ];
    const snapshot = JSON.parse(JSON.stringify(original));

    const result = shuffle(original);

    // الأصل لم يتغيّر
    assert.deepEqual(original, snapshot);
    // نفس الطول
    assert.equal(result.length, original.length);

    const key = (x) => `${x.term}|${x.description}`;
    const s1 = new Set(original.map(key));
    const s2 = new Set(result.map(key));
    assert.equal(s1.size, s2.size);
    for (const k of s1) assert.ok(s2.has(k));
  });

  it("returns a different array instance", () => {
    const arr = [1, 2, 3];
    const out = shuffle(arr);
    assert.notEqual(out, arr);
  });
});
