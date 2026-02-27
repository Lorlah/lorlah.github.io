# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This repository contains 9 independent static HTML/CSS/JavaScript front-end projects (no backend, no build tools, no package manager):

| Project | Description |
|---|---|
| `aniMatch` | Animal-themed memory card matching game |
| `Arcade-Game` | Frogger-style arcade game |
| `Bank-App` | Bank dashboard UI mockup |
| `ckLoading` | Animated loading page |
| `Feedreader` | RSS feed reader with Jasmine test suite |
| `OOJAFilms` | Film studio/portfolio website |
| `Pixel-Art-Maker` | Pixel art drawing tool |
| `Portfolio-Site` | Personal portfolio site |
| `RestaurantReviews` | Restaurant reviews app with maps & offline support |

### Running the projects

All projects are static HTML — serve them with any HTTP server from the workspace root:

```
python3 -m http.server 8000
```

Then access any project at `http://localhost:8000/<ProjectName>/index.html`.

### Testing

The only automated tests are the **Feedreader** Jasmine specs, which run in-browser at `http://localhost:8000/Feedreader/index.html` (scroll to the bottom of the page). There are 2 pre-existing test failures caused by bugs in the source (`jasmine/spec/feedreader.js` line 125 has a stray `s` character causing a `ReferenceError`, and the menu-click test has a logic issue).

### Caveats

- The root `node_modules/` directory contains an orphaned gulp installation with no corresponding `package.json` or `gulpfile.js` — it is unused and can be ignored.
- `RestaurantReviews` uses a Service Worker and a hardcoded Mapbox API token; it specifically expects to be served on port 8000.
- There are no lint tools, build steps, or CI pipelines configured in this repository.
