A single clickable action, in three treatments — use whenever the interface needs a button or button-styled link.

```jsx
<Button variant="primary" href="/contact">Contact Us</Button>
<Button variant="secondary" href="/services/appliance-installation">Our services</Button>
<Button variant="ghost" href="/work">See recent work →</Button>
```

Variants: `primary` (solid brass, ink text — the ONE place colour becomes a button; reserve for the single most important action per view), `secondary` (ink outline, fills solid ink on hover), `ghost` (no border, brand-blue link colour, for inline/tertiary actions). Pass `onClick`+`type` instead of `href` to render a real `<button>`. `disabled` dims to 50% opacity and blocks the pointer.
