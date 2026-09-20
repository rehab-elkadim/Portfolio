# Live device previews

The project URLs and optional backupUrl are configured in src/data/projects.js.
All three screens use real viewport widths (1440, 820, 390 CSS pixels), scaled only for presentation.
Only an expanded overview mounts the three iframes; closing it removes them.
On mobile the device buttons choose which screen to display.

## Connect synchronized scrolling
Copy public/portfolio-scroll-sync.js into each demo site's public folder.
Add this tag to that site's HTML, replacing the example origin:
<script src="/portfolio-scroll-sync.js" data-portfolio-origin="http://localhost:5173,https://YOUR-PORTFOLIO-DOMAIN" defer></script>

Use exact allowed portfolio origins, never a wildcard.
For a dashboard with an internal scrolling panel, add data-showcase-scroll to that panel.
The bridge supports one scrolling container per page. Otherwise it syncs the document.
Deploy the change to the demo site. The portfolio shows the scroll-together toggle only when all three frames complete the handshake.
Progress is matched proportionally, because responsive page lengths differ.
Navigation is independent; synchronized scrolling works when the frames show comparable content.

## Embedding
The site's HTTP Content-Security-Policy frame-ancestors must allow the portfolio origin.
X-Frame-Options DENY/SAMEORIGIN can block cross-origin embedding.
Change those settings only on sites you own, preserving their other security directives.
Third-party authentication and some external links may require Open live site.
Do not put production case data or credentials into demo previews.

## Backup URLs
Fill backupUrl for a project when an alternate public deployment is available.
The overview then provides Use backup site / Use main site.
Cross-origin iframe failures cannot reliably be detected by portfolio JavaScript, so switching is explicit.
Do not proxy or remove third-party frame protections.

## Current limitation
The portfolio-side integration and bridge are ready. Remote repositories have not been supplied, so the bridge has not been installed or deployed on the live projects.
