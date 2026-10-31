// node c/creator.test.js — checks the creator link's pure logic.
const assert = require("assert");
const C = require("./creator.js");
const I = require("../j/invite.js");
const stores = (s, p, a, pt) => ({
  steam: { live: s, url: "https://store.steampowered.com/app/5524390" },
  play: { live: p, url: "https://play.google.com/store/apps/details?id=com.balagangames.sneaklings.game" },
  appstore: { live: a, url: "https://apps.apple.com/app/id6824868469", pt: pt || "" },
});

assert.deepStrictEqual(C.linkFromQuery("?meriful"), { tag: "meriful", campaign: "wave1" });
assert.deepStrictEqual(C.linkFromQuery("?Meriful"), { tag: "meriful", campaign: "wave1" });
assert.deepStrictEqual(C.linkFromQuery("?3oeygaming&paid1"), { tag: "3oeygaming", campaign: "paid1" });
assert.deepStrictEqual(C.linkFromQuery("?fbclid=abc&meriful"), { tag: "meriful", campaign: "wave1" });
for (const q of ["", "?", "?utm_source=x", "?<script>", "?-dash", "?" + "a".repeat(41)])
  assert.deepStrictEqual(C.linkFromQuery(q), { tag: "", campaign: "wave1" }, q);

const link = { tag: "meriful", campaign: "wave1" };
const S = stores(true, true, true);
assert.strictEqual(C.trackedUrl("steam", S, link),
  "https://store.steampowered.com/app/5524390/?utm_source=meriful&utm_medium=creator&utm_campaign=wave1");
assert.strictEqual(C.trackedUrl("play", S, link),
  "https://play.google.com/store/apps/details?id=com.balagangames.sneaklings.game&referrer=utm_source%3Dmeriful%26utm_medium%3Dcreator%26utm_campaign%3Dwave1");
assert.strictEqual(C.trackedUrl("appstore", S, link), "https://apps.apple.com/app/id6824868469");
assert.strictEqual(C.trackedUrl("appstore", stores(1, 1, 1, "123456"), link),
  "https://apps.apple.com/app/apple-store/id6824868469?pt=123456&ct=meriful&mt=8");
assert.strictEqual(C.trackedUrl("steam", S, { tag: "", campaign: "wave1" }), "https://store.steampowered.com/app/5524390");

// The game reads only the referrer's `room` key, so the creator tags never look like an invite.
const ref = decodeURIComponent(C.trackedUrl("play", S, link).split("referrer=")[1]);
assert.ok(!/(^|&)room=/.test(ref), ref);

assert.strictEqual(C.redirectTarget(I.plan("android", S), S, link), C.trackedUrl("play", S, link));
assert.strictEqual(C.redirectTarget(I.plan("ios", stores(1, 1, false)), stores(1, 1, false), link), "");
assert.strictEqual(C.redirectTarget(I.plan("desktop", S), S, link), "");
console.log("creator.js: all checks pass");
