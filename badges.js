// Store badge markup shared by the home and invite pages.
window.storeBadge = function (key, url, verb) {
  var B = {
    steam: { small: verb || "Get it on", big: "Steam", glyph: "--g:#1b2838;box-shadow:inset 0 0 0 3px #66c0f4" },
    play: { small: "GET IT ON", big: "Google Play", glyph: "--g:conic-gradient(#34a853 0 25%,#fbbc04 0 50%,#ea4335 0 75%,#4285f4 0)" },
    appstore: { small: "Download on the", big: "App Store", glyph: "--g:#fff;border-radius:50%" },
  }[key];
  var inner = '<span class="glyph" style="' + B.glyph + '"></span><span><small>' + B.small + "</small><b>" + B.big + "</b></span>";
  if (!url) return '<span class="badge soon"><span class="glyph" style="' + B.glyph + '"></span><span><small>Coming soon to</small><b>' + B.big + "</b></span></span>";
  return '<a class="badge" href="' + url + '" rel="noopener">' + inner + "</a>";
};
