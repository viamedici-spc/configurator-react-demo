# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the demo app:
  - `src/config.ts` holds the engine endpoint, access token, and the configuration model (`deploymentName`/`channel`).
  - `src/configurator/Configurator.tsx` builds the `SessionContext` and renders the `Configuration` provider.
  - `src/configurator/attributes/` renders the attribute list (`Attributes.tsx`, `AttributeItem.tsx`, plus `choice/`, `boolean/`, `numeric/`, `component/`).
  - Supporting UI: `Menu.tsx`, `StoringMenu.tsx`, `ConfigurationSatisfactionIndicator.tsx`, `ErrorIndicator.tsx`.
- `index.html` + `src/main.tsx` are the Vite entry.

## Architecture Overview
- The app is a reference consumer of `@viamedici-spc/configurator-react` (hooks + the `Configuration` provider), which builds on `@viamedici-spc/configurator-ts` (the TypeScript client for the SPC Configuration Engine).
- `Configuration` receives a `SessionContext` and owns the session; it re-creates the session whenever the `SessionContext` changes by reference. Build the context with `useMemo` so it only changes when an input actually changes.
- **Sales Region as a Fixed Decision:** the Sales Region is deliberately *not* a dynamic `AttributeItem`. A hard-coded `<select>` in the header drives a `fixedDecisions` entry on the `SessionContext` (`{type: Choice, attributeId: {sharedConfigurationModelId: "SalesShared", localId: "SalesRegion"}, choiceValueId, state: Included}`). Because it is fixed at session creation, the engine trims the model to that region and the user cannot change it. Changing the region re-initializes the session.

## Build, Test, and Development Commands
- `bun install` installs (Bun is the package manager; never npm). Our own packages are exempt from the three-day minimum
  release age in `bunfig.toml`, so library prereleases install right away.
- `bun run dev` starts the Vite dev server on `http://localhost:3000` (with React Fast Refresh).
- `bun run verify` is the gate, its steps in parallel: `bun check`, oxlint, `bun fmt --check`, the build.
- `bun run build` builds the app into `dist/`; `bun run preview` serves the build.
- CI (`.github/workflows/deploy.yml`) builds every push and pull request (a branch with an open pull request builds
  twice) on the shared `pages-bun` workflow; it deploys to GitHub Pages only on a manual run (`workflow_dispatch`) on
  `main`.

## Coding Style & Naming Conventions
- TypeScript + React; `.tsx` for components; 4-space indentation; semicolons.
- Styling via `styled-components`. PascalCase for components, camelCase for functions/variables.
- Import contract types, enums, and errors (e.g. `SessionContext`, `AttributeType`, `ChoiceValueDecisionState`, `FixedDecision`) from `@viamedici-spc/configurator-ts`; import hooks and the `Configuration` component from `@viamedici-spc/configurator-react`.

## Testing Guidelines
- This is a manual demo without a unit-test suite. Verify changes by running `bun run dev` and driving the app in the browser (e.g. with the Playwright MCP): check the CreateSession request payload, attribute states, and trimming.

## Commit & Pull Request Guidelines
- Commit history uses short, sentence-case messages, typically past tense (e.g. “Updated configurator-react to 4.2.0”).
- Keep commits focused; include testing notes / screenshots for UI changes.

## Configuration Tips
- `src/config.ts` selects the engine and model. The endpoint/token must have the model (`Configurator-React-Demo-Car`) with the `SalesShared::SalesRegion` attribute deployed and must support the `fixedDecisions` CreateSession option.
- The demo depends on published (pre)release versions of the libraries; bump `@viamedici-spc/configurator-ts` and `@viamedici-spc/configurator-react` in `package.json` to consume new library changes.

## This repository is public

Everything committed here is public. Code, comments and commit messages describe only the public API and observable
behaviour — no engine internals, internal hosts, customer names or personal names. The demo's access token is a public
token limited to the demo's configuration model.
