# Turning on ads — your to-do list

Ads are built in but **switched off**. Nothing loads and no space is reserved until you finish the steps below.
Everything you edit is in `assets/ads-config.js`.

## Why you need a domain first
AdSense needs a site you own. A `peaceable0909.github.io/...` address is a shared domain, and AdSense generally won’t approve it. Buy the domain first.

## Checklist

### 1. Domain
- [ ] Buy a domain (Cloudflare Registrar, Namecheap, Porkbun …).
- [ ] Add a file named `CNAME` in the repo root containing just your domain, e.g. `pdfsort.app`.
- [ ] At the registrar, point DNS at GitHub Pages (follow GitHub’s “Configuring a custom domain” page: four `A` records for the apex, or a `CNAME` for `www`).
- [ ] Repo → Settings → Pages → enter the custom domain and tick **Enforce HTTPS** once the certificate is ready.
- [ ] Update `og:url` / canonical links and the `start_url` if you add any (the site currently uses relative paths, so most things just work).

### 2. Pages AdSense expects
- [ ] `privacy.html` — fill in the **[date]** and **[your contact email]** placeholders.
- [ ] Optional but helps approval: an About / Contact page, and enough real content on the landing page.
- [ ] Review the wording on the landing page. It says documents never leave the device — that stays true with ads, but don’t claim “no tracking” or “no third parties”.

### 3. AdSense
- [ ] Sign up at adsense.google.com with your domain and apply for the site.
- [ ] When approved, copy your publisher ID (`ca-pub-…`) into `client` in `assets/ads-config.js`.
- [ ] Create three display ad units (responsive) and paste their IDs into `slots`:
  - `landingMid` — landing page, before the privacy section
  - `landingBottom` — landing page, above the footer
  - `organizerRail` — organizer sidebar
- [ ] Replace `ads.txt` with the line AdSense gives you (it must be served at `https://yourdomain/ads.txt`).
- [ ] Set `enabled: true`, merge, wait for the Pages deploy.

### 4. Consent (if you have visitors in the EU / UK / Switzerland)
- [ ] Google requires a certified consent banner (CMP) for personalized ads there. `personalized` is `false`, so only non-personalized ads are requested until you add one. Use AdSense → Privacy & messaging to create the free Google consent message and add its script to the pages.
- [ ] Keep `personalized: false` if you skip this.

### 5. After launch
- [ ] Check the site on your phone: ads shouldn’t cover buttons or push the page around.
- [ ] Ad blockers will hide ads for some visitors — that’s normal.
- [ ] Never click your own ads (AdSense can ban the account). Use Google’s ad preview tools to test.

## Where ads appear
Landing page (two spots) and the organizer sidebar. The PDF and Word editors are deliberately ad-free so nothing sits near a student’s document. To add another spot: put `<div class="ad-slot" data-ad-slot="myName"></div>` on the page, add `myName` under `slots` in the config, and make sure the page loads `assets/ads-config.js` and `assets/ads.js`.

## Not ready for AdSense?
Other options that need no ad network: a donation link (Ko-fi / Buy Me a Coffee), a paid “Pro” tier, or a direct sponsor banner. Tell me and I can wire any of these in.
