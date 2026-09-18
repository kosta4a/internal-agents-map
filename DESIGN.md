# Design

- Use ABC Areal on every page. Default sizes: 20px titles, 16px headings, 14px body and controls, 12px metadata. Use regular (400) and medium (500) weights; inherit existing responsive overrides.
- Keep one font weight within a paragraph; use darker text for inline emphasis.
- Keep white backgrounds and Radix Sand colors: `--sand-12` for primary text, `--sand-10` for secondary text, `--sand-3` for surfaces, and `--sand-6` for fine table dividers.
- Reuse the centered 684px content column, sticky header, sidebar, and desktop table of contents. Follow the shared mobile layout with 24px page padding.
- Use 8–16px spacing within components and 24–40px between groups.
- Keep catalog previews unboxed and fully clickable: title, muted summary, and rounded 14px tags. Keep search in the floating bottom pill.
- Group workflows, lessons, and related links in soft Sand panels with 14–16px corners. Use consistent tables for structured details.
- Use 40px-high buttons with 10px corners, a label on the left, and an existing icon on the right. Use the dark variant for the main onward action.
- Reuse the shared icons and components. Keep diagrams simple and consistent with the same type and palette.
- Keep motion subtle: quick hover feedback, smooth filtering and disclosures, and support for reduced motion. Preserve keyboard focus and accessible labels.

Reference: [tokens](src/styles/tokens.css), [layout](src/styles/layout.css), [components](src/styles/components.css).
