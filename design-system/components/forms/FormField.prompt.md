A single labeled input, with help text or an inline error state.

```jsx
<FormField id="email" label="Email" type="email" help="So we know how to reach you." />
<FormField id="email-err" label="Email" value="not-an-email" error="Enter a valid email so we can send your quote." />
```

Errors set `aria-invalid` and swap the border + help copy to `--color-error`. Used to compose the quote-request form (name, contact, service, region, optional photo).
