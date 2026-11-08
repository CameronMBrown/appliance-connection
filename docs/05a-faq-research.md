# 05a — FAQ Research (dev-facing)

Background for `05-faq-question-bank.md` (the short Craig-facing questionnaire). Not sent to the client.
Drafted 2026-11-08.

## Business framing

An installation specialist covering three trades homeowners assume need three people: **appliance hookup,
gas fitting and plumbing**. 30+ years, fully licensed and insured, all work warrantied, 24-hour response,
factory-trained Jenn Air / Sub-Zero / Thermador installer, also kitchen/bathroom/laundry renovation.
Serves Durham, Peterborough (and, in the rebuild, Kawartha Lakes and Northumberland).

Edge over search competitors: they lead with "cheap and fast" and mix repair with install. We lead with
craft, licensing, high-end built-ins and gas. Reno-stage coordination (rough-in, hookup after countertops)
is under-served.

Audience, in priority order: (1) homeowner mid-reno with high-end appliances, (2) homeowner whose delivery
crew will not hook up gas, (3) homeowner adding a gas line (BBQ, range, heater), (4) light trade traffic
(retailers, designers, builders).

## Customer pain points (from competitor listings, retailer install policies, reviews)

- Unclear pricing and add-on fees (valves, venting kits, gas permits, conversion kits often extra).
- Unsure who may do gas work, and whether a permit or inspection is needed.
- Delivery crews that refuse gas/plumbing hookups.
- Dryer vents that come loose or are the wrong type; leaks after install.
- Fit surprises: cutouts, clearances, panel-ready specs.
- Voiding the manufacturer warranty with a bad install.
- No-shows, vague arrival windows, old-appliance removal.
- Finding anyone who will touch high-end built-ins.

## Keyword clusters

> Directional only. No search-volume data. Verify in Ahrefs/Similarweb (connectors available, not yet
> authenticated) before committing.

| Cluster | Example terms | Page |
|---|---|---|
| Core | appliance installation Durham / Peterborough, appliance installer near me | Home, region hubs |
| Gas | gas line installation, gas range installation, gas dryer hookup, BBQ gas line, TSSA registered gas fitter | Gas piping |
| Laundry | dryer installation, dryer vent installation, move laundry upstairs | Laundry rooms |
| Premium | built-in appliance installation, panel-ready dishwasher install, range hood venting | Appliance installation, Kitchens |
| Plumbing | disconnect sink for countertop, faucet install, water softener install | Plumbing fixtures |
| Heaters | garage heater installation, pool heater install, water heater replacement | Heaters |
| Local | Oshawa, Whitby, Ajax, Pickering, Bowmanville/Clarington, Peterborough, Lakefield, Lindsay, Cobourg | Region hubs |

## Principles

- One question, one page. The four region hubs share a four-question core (intentional overlap).
- Questions match each page's intent (awareness on home, trust on gas, reno coordination on kitchens,
  local reassurance on regions, friction removal on contact).
- Pricing: how it works and what moves it, no dollar figures.
- Phrase questions as customers search, so they can back FAQ schema later.

## Live-site facts used as draft answers (theapplianceconnection.ca, fetched 2026-11-08)

- 30+ years, "fully licensed and insured", "we warranty all of our work", respond within 24 hours.
- Installs all makes/models, gas and electric, freestanding and built-in, custom panels, ventilation
  (range hood, microwave, dryer vent), new or clean existing dryer vents.
- Picks up appliances from selling partners, delivers, installs, **removes and disposes of old appliances at
  no additional cost**.
- Factory-trained Jenn Air, Sub-Zero, Thermador; Jenn Air gets an extra 1-year warranty when installed by us.
- **"We also service and repair all makes of gas appliances."** (Only repair claim; gas appliances only.)
- Gas: above/below grade for stove, dryer, BBQ, pool heater, garage heater; electric-to-gas rough-ins.
- Kitchens: general contracting, coordinate trades and scheduling (flooring, tile, paint, appliances).
- Bathrooms: full renovations. Plumbing: fixtures, faucets, water heaters (gas/electric), water softening
  and filtration. Laundry: relocations, spare bedroom or closet conversions, stacked units.
- Heaters: garage, shop, pool, BBQ, gas fire pit. "Call us for a free quote."
- Not on the live site: FAQ, hours, payment, licence numbers, TSSA, insurance details, warranty length,
  town list.

## Migration of old FAQ placeholders (`web/src/fixtures/pages.ts`)

| Old question | New ID |
|---|---|
| Do you supply the appliance, or just install it? | H3 |
| Are you licensed for gas? | G1 |
| How soon can you come out? | RC2 |
| Do you charge for travel within the region? | RC3 |
| What does a quote cost? | H8 |
| Do you take the old appliance away? | A4 |

## Sources

- [HomeStars: installers, Whitby](https://www.homestars.com/electricity/dryer-repair-specialist-pros/whitby)
- [HomeStars: installers, Bowmanville](https://www.homestars.com/electricity/appliances-repair-specialist-pros/bowmanville)
- [Dishwasher installation cost in Canada, 2026](https://renoquotes.com/en/blog/dishwasher-installation-cost-in-canada-2026-price-guide)
- [Leon's installation policy](https://leons.ca/pages/installations)
- [Canadian Gas Service reviews, HomeStars](https://sp-marge.homestars.com/companies/2815867-canadian-gas-service/reviews/582358)
- Live site pages: [home](https://theapplianceconnection.ca/), [about](https://theapplianceconnection.ca/about-the-appliance-connection/), [services](https://theapplianceconnection.ca/services/)
