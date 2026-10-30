// Store pages and the trailer, one switch each (spec: docs/superpowers/specs/
// 2026-10-30-web-invite-links-design.md in the game repo). A store button shows only while
// its store is `live`; flip one when that store page goes public, in a one-line commit.
// The App Store url needs the app's numeric Apple ID (the Mac reads it from App Store Connect).
window.STORES = {
  steam: { live: false, url: "https://store.steampowered.com/app/5524390" },
  play: { live: false, url: "https://play.google.com/store/apps/details?id=com.balagangames.sneaklings.game" },
  appstore: { live: false, url: null },
};
// The trailer's YouTube id ("" hides the section). Loads only when a visitor presses play.
window.TRAILER_ID = "NXsPhvSUwOg";
