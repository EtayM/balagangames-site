// Store buttons shared by the home and invite pages. Google Play and the App Store use their
// official badge art, unaltered (img/badges/, from Google's and Apple's badge pages). Steam has
// no store badge and its logo must stand alone (Valve brand rules), so Steam is a plain button.
// A store whose page isn't public yet gets a text-only "Coming soon" pill, never altered art.
window.storeBadge = function (key, url, verb) {
  var NAME = { steam: "Steam", play: "Google Play", appstore: "App Store" }[key];
  if (!url) return '<span class="badge soon"><span><small>Coming soon to</small><b>' + NAME + "</b></span></span>";
  if (key === "play")
    return '<a class="store-badge play" href="' + url + '" rel="noopener"><img src="/img/badges/google-play-badge.png" alt="Get it on Google Play" width="646" height="250"></a>';
  if (key === "appstore")
    return '<a class="store-badge appstore" href="' + url + '" rel="noopener"><img src="/img/badges/app-store-badge.svg" alt="Download on the App Store" width="120" height="40"></a>';
  return '<a class="badge steam" href="' + url + '" rel="noopener"><span><small>' + (verb || "Get it on") + "</small><b>Steam</b></span></a>";
};
