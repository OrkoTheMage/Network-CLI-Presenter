# stp-presentation

Interactive CLI / ASCII presentation tool. Displays presentations as ASCII diagrams in the terminal with keyboard-driven navigation. Currently contains a presentation on STP; more presentations will be added.

## Features
- Interactive, terminal-first presentations rendered as ASCII diagrams
- Keyboard navigation and focused highlights for diagram sections
- Extensible diagram sources (add more presentations later)

## How to use

Prerequisites: Node.js (LTS recommended).

Install dependencies:

```bash
npm install
```

Start the presentation:

```bash
npm start
```

Or run directly:

```bash
node src/index.js
```

## Controls
- `Tab` — Next diagram
- `Backspace` — Previous diagram
- `Z` — Cycle next highlighted (hash) line within the current diagram
- `Ctrl+C` — Exit

## Tech stack
- Node.js (ES Modules)
- Libraries: `blessed`, `blessed-contrib`, `chalk`

Key source files:
- [src/index.js](src/index.js)
- [src/diagrams.js](src/diagrams.js)
- [src/ui.js](src/ui.js)
- [src/renderer.js](src/renderer.js)
- [src/state.js](src/state.js)
- [src/utils/controls.js](src/utils/controls.js)

## Current content
- Presentation on STP. More presentations will be added in future updates.
