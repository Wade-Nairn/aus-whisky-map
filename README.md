# Aus Whisky Map

An interactive map of every whisky distillery in Australia — built as a portfolio project by [Wade Nairn](https://wadenairn.dev).

**Live site:** [auswhiskymap.com](https://auswhiskymap.com)

---

## Stack

- **Framework:** SvelteKit (Svelte 5)
- **Map:** MapLibre GL JS with OpenFreeMap tiles
- **Styling:** Tailwind CSS v4
- **Data:** GeoJSON — all distillery data lives in the repo
- **Hosting:** Cloudflare Pages

## Running locally

```bash
npm install
npm run dev
```

## Adding a distillery

Edit `static/data/distilleries.geojson` and add a new Feature object:

```json
{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [longitude, latitude] },
  "properties": {
    "id": "unique-slug",
    "name": "Distillery Name",
    "state": "TAS",
    "region": "Southern Tasmania",
    "founded": 2010,
    "website": "https://example.com",
    "description": "A short description.",
    "styles": ["Single Malt"],
    "visitor_centre": true,
    "notable": "One interesting fact"
  }
}
```

## Adding a news article

Create a new `.md` file in `src/content/news/` with this frontmatter:

```markdown
---
title: "Article Title"
date: "2025-06-01"
category: "Review"
excerpt: "A short summary shown on the news index."
---

Article content here...
```

Categories: `Review`, `Guide`, `Feature`

## Building for production

```bash
npm run build
```

Output goes to `.svelte-kit/cloudflare` for Cloudflare Pages.
