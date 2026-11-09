# Dotfiles Showcase Website

The website and interactive configuration viewer for my **[dotfiles](https://github.com/insaneodyssey26/dotfiles)** repository (running Arch Linux with Niri).

---

## What It Does

- **Live GitHub Sync**: Directly pulls raw configuration files (`.kdl`, `.conf`, `.jsonc`, `.css`, scripts) from the `main` branch of the dotfiles repo so everything stays up to date without manual edits.
- **Scroll Progress & Minimal UI**: Smooth pill navigation, dynamic scroll progress indicators, and clean glassmorphic styling.
- **Config Explorer**: Interactive viewer with category filters, installation paths, and quick commands.
- **Image Lightbox**: Click to view the desktop preview full-size.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Vanilla CSS (custom tokens & glassmorphism)
- **Fonts**: Geist Sans & Geist Mono
- **Deployment**: Vercel

---

## Local Development

```bash
git clone https://github.com/insaneodyssey26/dotfiles-website.git
cd dotfiles-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Related Repositories

- **[insaneodyssey26/dotfiles](https://github.com/insaneodyssey26/dotfiles)** — My personal Arch Linux dotfiles (Niri scrollable tiling, Waybar, Matugen, Kitty, Hyprlock, and scripts).
