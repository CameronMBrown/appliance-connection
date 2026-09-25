Page-top video hero: full-cover 16:9 video, scrim, arched wordmark (or a plain heading), Benguiat sub-line, up to two buttons, optional phone strip.

```jsx
<Hero videoUrl="/video/hero-install.mp4" subheading="Complete home appliance installations"
  primaryLabel="Our services" primaryShortLabel="Services" primaryUrl="/services/"
  secondaryLabel="Contact Us" secondaryShortLabel="Contact" secondaryUrl="/contact/"
  phones={[{ label: 'Phone Durham Region', phone: '905.259.6545', tel: '19052596545' },
           { label: 'Phone Peterborough', phone: '705.742.0306', tel: '17057420306' }]} />

<Hero heading="Gas piping" subheading="Licensed gas fitting across Durham and Peterborough" videoUrl="/video/gas.mp4" primaryLabel="Contact Us" primaryUrl="/contact/" />
```

Frame is 16:9 so the whole video shows on desktop; narrow screens keep a min-height and crop the video's sides. Past 1600px it floats on the ink band with a white rule and drop shadow. Hero videos should be 16:9. Use `scrim="strong"` if footage is bright.
