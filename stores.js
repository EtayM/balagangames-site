// Store pages and the trailer, one switch each (spec: docs/superpowers/specs/
// 2026-10-30-web-invite-links-design.md in the game repo). A store button shows only while
// its store is `live`; flip one when that store page goes public, in a one-line commit.
window.STORES = {
  // releasesAt: before it, the creator page's Steam button says "Wishlist on".
  steam: { live: false, url: "https://store.steampowered.com/app/5524390", releasesAt: "2026-12-03T18:00:00Z" },
  play: { live: false, url: "https://play.google.com/store/apps/details?id=com.balagangames.sneaklings.game" },
  // pt: App Store Connect's provider token (App Analytics → campaign link generator); the
  // creator page tags App Store links only once it is set.
  appstore: { live: false, url: "https://apps.apple.com/app/id6824868469", pt: "" },
};
// The trailer's YouTube id ("" hides the section). Loads only when a visitor presses play.
window.TRAILER_ID = "NXsPhvSUwOg";
