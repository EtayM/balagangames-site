// node j/invite.test.js — checks the landing page's pure logic.
const assert = require("assert");
const I = require("./invite.js");
const live = (s, p, a) => ({ steam: { live: s, url: "S" }, play: { live: p, url: "P?id=x" }, appstore: { live: a, url: "A" } });

for (const q of ["?QZ4K", "?qz4k", "?QZ4K&utm_source=tw", "?Q-Z 4K", "QZ4K"]) assert.strictEqual(I.codeFromQuery(q), "QZ4K", q);
for (const q of ["", "?", "?ABCDE", "?QZ0K", "?utm=1", "?QZ4"]) assert.strictEqual(I.codeFromQuery(q), "", q);

assert.strictEqual(I.device("Mozilla/5.0 (Linux; Android 14; 2312DRA50G)", 5), "android");
assert.strictEqual(I.device("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", 5), "ios");
assert.strictEqual(I.device("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 5), "ios"); // iPadOS
assert.strictEqual(I.device("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 0), "desktop");
assert.strictEqual(I.device("Mozilla/5.0 (Windows NT 10.0; Win64; x64)", 0), "desktop");

assert.deepStrictEqual(I.plan("android", live(false, true, false)), { main: "play", soon: false, phones: [] });
assert.deepStrictEqual(I.plan("ios", live(true, true, false)), { main: "appstore", soon: true, phones: [] });
assert.deepStrictEqual(I.plan("desktop", live(false, true, false)), { main: "steam", soon: true, phones: ["play"] });
assert.deepStrictEqual(I.plan("desktop", live(true, true, true)), { main: "steam", soon: false, phones: ["play", "appstore"] });

assert.strictEqual(I.storeUrl("play", live(1, 1, 1), "QZ4K"), "P?id=x&referrer=room%3DQZ4K");
assert.strictEqual(I.storeUrl("play", live(1, 1, 1), ""), "P?id=x");
assert.strictEqual(I.storeUrl("steam", live(1, 1, 1), "QZ4K"), "S");
console.log("invite.js: all checks pass");
