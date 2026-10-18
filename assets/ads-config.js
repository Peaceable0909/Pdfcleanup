/* Ad settings — the only file you edit to turn ads on.
   Everything stays OFF until `enabled` is true AND the IDs below are real, so nothing loads and no space is reserved.
   Steps are in docs/ADS-SETUP.md. */
window.PDFSORT_ADS = {
  enabled: false,                       // flip to true after AdSense approves your domain
  client:  'ca-pub-0000000000000000',   // your AdSense publisher ID
  slots: {                              // one ad unit ID per placement (AdSense → Ads → By ad unit)
    landingMid:    '0000000000',        // landing page, between "tools" and the privacy section
    landingBottom: '0000000000',        // landing page, above the footer
    organizerRail: '0000000000'         // organizer sidebar, below the document list
  },
  personalized: false                   // false = non-personalized ads only (safest until you add a consent banner)
};
