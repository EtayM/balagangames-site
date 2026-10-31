// Store pages and the trailer, one switch each (spec: docs/superpowers/specs/
// 2026-10-30-web-invite-links-design.md in the game repo). A store button shows only while
// its store is `live`; flip one when that store page goes public, in a one-line commit.
window.STORES = {
  steam: { live: false, url: "https://store.steampowered.com/app/5524390" },
  play: { live: false, url: "https://play.google.com/store/apps/details?id=com.balagangames.sneaklings.game" },
  appstore: { live: false, url: "https://apps.apple.com/app/id6824868469" },
};
// The trailer's YouTube id ("" hides the section). Loads only when a visitor presses play.
window.TRAILER_ID = "NXsPhvSUwOg";
