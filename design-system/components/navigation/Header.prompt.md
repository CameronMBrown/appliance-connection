The site header — logo/wordmark, primary nav, and the standing "Contact Us" CTA. One per page, always at the top.

```jsx
<Header logoSrc="/assets/logo/truck-logo-detailed.png" onNavigate={(href) => setRoute(href)} />
```

Falls back to a bordered "AC" monogram when no `logoSrc` is passed (matches the placeholder in the live codebase). Nav collapses below 820px — a mobile menu toggle is not yet built; the CTA remains visible.
