// The creator link's logic (balagangames.com/c?TAG). One link per creator for their
// description: phones go to their store, computers get Steam, every store link carries the
// creator's tag (game repo: docs/marketing/creator-outreach.md §5). Pure functions on top;
// `node c/creator.test.js` checks them. Device detection and the store plan are the invite
// page's (j/invite.js), loaded first.
(function (root) {
  "use strict";
  var TAG = /^[a-z0-9][a-z0-9_-]{0,39}$/;
  var DEFAULT_CAMPAIGN = "wave1";

  // {tag, campaign} from "?meriful" or "?meriful&paid1"; tag "" when missing or malformed.
  // Bare items only (no "="), so a stray "?utm_source=x" never becomes a tag.
  function linkFromQuery(search) {
    var bare = String(search || "").replace(/^\?/, "").split("&").filter(function (s) {
      return s && s.indexOf("=") < 0;
    }).map(function (s) { return decodeURIComponent(s).toLowerCase().trim(); });
    var tag = bare[0] && TAG.test(bare[0]) ? bare[0] : "";
    var campaign = tag && bare[1] && TAG.test(bare[1]) ? bare[1] : DEFAULT_CAMPAIGN;
    return { tag: tag, campaign: campaign };
  }

  // A store URL with the creator's tracking, in each console's own format. No tag, no tracking.
  // The App Store's campaign needs the provider token (stores.appstore.pt); without it the
  // link stays plain rather than half-tagged.
  function trackedUrl(key, stores, link) {
    var url = stores[key].url;
    if (!link.tag) return url;
    if (key === "steam")
      return url + "/?utm_source=" + link.tag + "&utm_medium=creator&utm_campaign=" + link.campaign;
    if (key === "play")
      return url + "&referrer=" + encodeURIComponent(
        "utm_source=" + link.tag + "&utm_medium=creator&utm_campaign=" + link.campaign);
    if (key === "appstore" && stores.appstore.pt)
      return url.replace("/app/", "/app/apple-store/") + "?pt=" + stores.appstore.pt + "&ct=" + link.tag + "&mt=8";
    return url;
  }

  // Phones skip the page and land in their store (when it's public); computers see the card.
  function redirectTarget(plan, stores, link) {
    if (plan.main === "steam" || plan.soon) return "";
    return trackedUrl(plan.main, stores, link);
  }

  var api = { linkFromQuery: linkFromQuery, trackedUrl: trackedUrl, redirectTarget: redirectTarget };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SneakCreator = api;
})(this);
