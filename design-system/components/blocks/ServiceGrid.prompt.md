Section wrapper for a row of ServiceCard tiles — optional heading + a responsive auto-fit grid.

```jsx
<ServiceGrid heading="What we install">
  <ServiceCard title="Appliance installation" description="Every make & model." url="/services/appliance-installation" />
  <ServiceCard title="Gas piping" description="Licensed gas fitting." url="/services/gas-piping" />
</ServiceGrid>
```

Grid columns auto-fit at a 16rem minimum, so 2–4 cards reflow gracefully at any width.
