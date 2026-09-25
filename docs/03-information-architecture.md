# 03 — Information Architecture

## Sitemap v2 (proposed)

```
/                                 Home
/services/                        Services hub
  /services/appliance-installation/
  /services/gas-piping/
  /services/kitchens/
  /services/laundry-rooms/
  /services/plumbing-fixtures/
  /services/heaters/              (shop/garage + pool + water heaters)
/durham/                          Durham regional hub          ← root (per client ask)
  /durham/oshawa/  /durham/whitby/  /durham/pickering/ …       (key cities, unique content)
/peterborough/                    Peterborough regional hub    ← root (per client ask)
  /peterborough/<town>/           (key towns, unique content)
/about/                           About (owner story, credentials, trucks)
/contact/                         Contact + quote form
/projects/                        Portfolio (phase 2, as real photos arrive) — optional v1
/brands/                          Brands we install — optional, high-intent
/privacy/ · /legal                Utility
```

### URL decisions

- **Region hubs at root** (`/durham`, `/peterborough`) — confirmed per client.
- **City pages nested under region** (`/durham/oshawa`) — recommended for clean hierarchy + SEO context
  (vs flat `/oshawa`). *To confirm.*
- **Proposed launch cities** (adjust to real coverage): Durham → Oshawa, Whitby, Pickering/Ajax,
  Bowmanville (Clarington); Peterborough → Peterborough city, Lakefield/Selwyn. *To confirm.*
- Keep the 6 services (optionally consolidate the heater pages); add deep service pages later.

## Local/regional SEO strategy

**v1 = focused, not aggressive.** Ship the two regional hubs + a handful of key city pages, each with
**genuinely unique content** (local specifics, nearby projects, local testimonials). **Defer the full
service×city matrix** until we can differentiate each page.

> ⚠️ **Doorway/thin-content risk.** Google penalises near-identical pages that differ only by town name
> ("Gas Piping in Oshawa" / "…in Whitby" / "…in Ajax"). Reach is worthless if the pages get filtered or
> drag the domain down. Every location page must earn its uniqueness.

The Location CPT + Astro dynamic routes make city pages a **scalable template driven by structured data**
— a good Astro content exercise. Add `LocalBusiness` + `Review` schema for rich results.

## Idea bank (beyond /durham, /peterborough)

- **Municipality landing pages** within each region (Durham: Oshawa, Whitby, Ajax, Pickering,
  Bowmanville/Clarington, Port Perry, Uxbridge; Peterborough: Peterborough city, Lakefield, Ennismore,
  Bridgenorth…).
- **Service × Location matrix** (e.g. `/gas-piping/oshawa`) — only with genuinely unique per-page content.
- **"Brands we install"** pages (Sub-Zero, Wolf, Miele, Bosch, Thermador, KitchenAid…) — high-intent,
  reinforces premium positioning.
- **Deep service pages** (range-hood venting, gas line for range/BBQ/dryer, cooktop/wall oven, dishwasher,
  laundry relocation, garage/shop heaters, pool + water heaters).
- **Project/portfolio case studies** (real photos) — SEO + trust + location relevance.
- **Cost/FAQ guides** ("Cost to run a gas line in Ontario", "Do I need a licensed gas fitter (TSSA)?") —
  top-of-funnel informational.
- **Reviews + schema** for rich results; a **blog** later for freshness/long-tail (not a launch priority).
