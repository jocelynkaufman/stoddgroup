# Stodd Group Website

This repo IS the deployed static site. There is **no Astro source on this machine** — every file is the build output. Edits are made directly to the deployed HTML.

## CSS gotcha — Tailwind classes are purged

The site was built with Astro + Tailwind v4, which purged every utility class not seen in the original source. The result lives in `_astro/_slug_.*.css`.

**This means: adding a Tailwind class to HTML that wasn't already in the build's source will silently have no effect.** The class string is in the markup, the browser sees it, but no rule exists for it.

### Two ways to add styling

1. **Inline `style="..."`** — preferred for one-off tweaks, layout pieces, anything page-specific. The site already uses this pattern heavily (footer social icons, hero overlays, section CTAs).

2. **Append to the extensions block** in `_astro/_slug_.*.css` — for utility classes you'll reuse, or for responsive variants that don't fit inline well. The block is at the bottom of the file, marked `/* HAND-EDITED EXTENSIONS */`. Match the existing rule format (`calc(var(--spacing) * N)` for spacing).

   Before adding a new class to HTML, check if it exists:
   ```bash
   grep -F ".class-name{" _astro/_slug_.*.css
   ```

### Cache busting on deploy

Browsers cache the CSS aggressively. When you edit the CSS file, **also bump its filename** (e.g., `DtdKSYIE4.css` → `DtdKSYIE5.css`) and update the `<link>` href in every HTML file:

```bash
OLD=DtdKSYIE4 NEW=DtdKSYIE5
mv _astro/_slug_.${OLD}.css _astro/_slug_.${NEW}.css
grep -rl "${OLD}" --include="*.html" . | xargs perl -i -pe "s/${OLD}/${NEW}/g"
```

This is what the "Bump CSS filename to bust browser cache" commit did historically.

## Site structure

- Each route is a directory with `index.html` (e.g., `about/`, `buying-a-house/`, blog post slugs at the repo root).
- 74 HTML pages share the same footer markup. Bulk footer edits use:
  ```bash
  grep -rl "Stodd Group Real Estate Logo" . --include="*.html" > /tmp/files.txt
  while IFS= read -r f; do perl -i -pe 's|OLD|NEW|g' "$f"; done < /tmp/files.txt
  ```
- Blog posts each have an inline `<style>` block in `<head>` defining `.prose h2`, `.prose p`, `.prose ul`, etc. The Tailwind Typography plugin classes (`prose`, `prose-lg`) act only as scoping markers and have no rules of their own.

## Deploy workflow

Iterate on localhost → push to `staging` → review the Vercel preview → merge to `main` → live at stoddgroup.com.
