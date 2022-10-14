# tv-maze-dashboard

Used an open TV shows API http://www.tvmaze.com/api to create an application that allows users to view a few lists(preferable horizontal list) of TV shows based on different genres (drama, comedy, sports, etc.).

## Architecture

The app is created with Vue (mandatory). I tried to stay in the Vue ecosystem when picking other packages.
* for statemanagement Pinia is used.
* for component library Quasar is used.
* for unit testing Vitest is used.

To top it of a basic CI/CD sturcure is set up consisting of a Github workflow which runs a quality ensurance pipeline and an automatic deployment to Vercel. Which will run when main is updated. 

## Test coverage
![test coverage screenshot](https://raw.githubusercontent.com/timdamen/tv-maze-dashboard/main/src/assets/screenshot-test-cov.png
)

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
