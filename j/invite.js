// The invite landing page's logic (balagangames.com/j?CODE). Pure functions on top, the DOM
// wiring at the bottom; `node j/invite.test.js` checks the pure part. The code rules mirror
// the game's RoomCodeRules + InviteLinkRules.parse: 4 characters of the room alphabet, any
// case, spaces and dashes ignored.
(function (root) {
  "use strict";
  var ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1
  var CODE_LENGTH = 4;

  // The room code in a query string ("?QZ4K", "?qz4k&utm_source=x"), or "".
  function codeFromQuery(search) {
    var items = String(search || "").replace(/^\?/, "").split("&");
    for (var i = 0; i < items.length; i++) {
      if (items[i].indexOf("=") >= 0) continue;
      var code = decodeURIComponent(items[i]).toUpperCase().replace(/[\s\- ]/g, "");
      if (code.length !== CODE_LENGTH) return "";
      for (var k = 0; k < code.length; k++) if (ALPHABET.indexOf(code[k]) < 0) return "";
      return code;
    }
    return "";
  }

  // "android" | "ios" | "desktop". iPadOS reports a Mac user agent; touch gives it away.
  function device(userAgent, maxTouchPoints) {
    var ua = String(userAgent || "");
    if (/Android/i.test(ua)) return "android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Macintosh/i.test(ua) && (maxTouchPoints || 0) > 1) return "ios";
    return "desktop";
  }

  // What the page offers: {main: store key, soon: bool, phones: [store keys]}.
  // A phone gets its own store, or "coming soon" while that page isn't public. A computer gets
  // Steam (or Steam's "coming soon"), plus the phone stores that are live.
  function plan(dev, stores) {
    if (dev === "android") return { main: "play", soon: !stores.play.live, phones: [] };
    if (dev === "ios") return { main: "appstore", soon: !stores.appstore.live, phones: [] };
    var phones = ["play", "appstore"].filter(function (k) { return stores[k].live; });
    return { main: "steam", soon: !stores.steam.live, phones: phones };
  }

  // The Play URL carries the code through the install (the game reads it on first launch).
  function storeUrl(key, stores, code) {
    var url = stores[key].url;
    if (key === "play" && code) url += "&referrer=" + encodeURIComponent("room=" + code);
    return url;
  }

  // The line under a computer's QR: names only the phone stores that are live, so it never
  // promises a store page that isn't public yet.
  function desktopScanLine(p) {
    var names = p.phones.map(function (k) { return k === "play" ? "Android" : "iPhone"; });
    if (!names.length) return "Scan this with your phone to open the invite there.";
    return "On your phone instead? Scan this to join from there. Free on " + names.join(" and ") + ".";
  }

  var api = { codeFromQuery: codeFromQuery, device: device, plan: plan, storeUrl: storeUrl, desktopScanLine: desktopScanLine };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SneakInvite = api;
})(this);
