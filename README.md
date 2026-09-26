# Sprintboard

A kanban board in React where you build your own columns and cards, drag the
cards between columns, and can pull real issues from any public GitHub
repository onto the board.

Course project for JavaScript 3.

## Features

- Create, rename, reorder and delete columns
- Cards with a title, description, label, assignee and due date
- Drag cards between columns, or move them with the arrows
- Import open issues from a public GitHub repository
- Search, filter by label and assignee, sort by title or due date
- Light and dark theme, works on a phone
- Everything is saved in `localStorage`

## Getting started

```bash
npm install
npm run dev
```

The app starts on `http://localhost:5173`.

Other commands:

```bash
npm run build     # production build
npm run preview   # preview the build
npm run lint      # run ESLint
```

## Requirements

- **Components** — 19 components. Reusable ones in `src/components/ui/`, board
  specific ones in `src/components/board/`, pages in `src/pages/`
- **Routing** — React Router with `/`, `/import` and a catch-all 404 route, set up in
  `src/App.jsx`
- **Shared state** — columns and cards live in `BoardProvider` and are read through the
  `useBoard` hook. Form fields stay in local `useState` in their own component
- **External API** — open issues are fetched from the GitHub REST API in
  `src/pages/ImportPage.jsx`, with a spinner while loading and separate messages for a
  missing repository, a reached rate limit, other status codes and a failed connection
- **Forms and validation** — five forms. `src/utils/validation.js` rejects empty and
  duplicate column names and checks the `owner/repo` format, and the message is shown
  next to the field
- **Persistence** — columns, cards and the chosen theme are saved to `localStorage`

Beyond the shared requirements:

- Empty states for an empty board, a search with no matches, a repository without open
  issues, and an import attempted before any column exists
- Reusable UI components and two custom hooks, `useBoard` and `useTheme`
- Works down to phone size, with larger controls where there is no hover
- Drag and drop, search, filtering by label and assignee, sorting, light and dark theme
- One branch and one pull request per feature, with descriptive commit messages

## Deploy

https://jkatariina.github.io/sprintboard/
