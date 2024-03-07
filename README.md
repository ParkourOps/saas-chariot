# SaaS Chariot

SaaS Chariot is an opinionated framework to rapidly develop SaaS products.
This repository acts as a template for a SaaS Chariot project.

## Initiating a Project

### How to Fork

To create a new project based on this framework, do not use the 'fork' feature of GitHub. Instead, follow these steps:

1. On GitHub, create a new empty repository, let's call this the _project repo_.

2. `git clone` the _project repo_ locally and `cd` into it.

3. Add this, the `main` branch of the _framework repo_, as an upstream remote to the _project repo_ clone, let's name this remote `framework`.:

    ```bash

      git remote add framework https://github.com/ParkourOps/saas-chariot

    ```

4. Create a local branch on the _project repo_ clone called `framework` which will reflect the `main` branch of the _framework repository_.

    ```bash

      git fetch framework main
      
      git checkout -b framework --track framework/main

    ```

5. Create the `main` branch on the _project repo_.

    ```bash

      git checkout -b main

      git push -u origin main

    ```

6. Install the Node dependencies and get developing!

    ```bash

      npm install

    ```

## Features

### Framework

* _TypeScript_ is used to ensure consistency in the structure of data and the interfaces to runtime components that use data.

* _Vue 3_ is used as the overall framework to implement the Single Page Application (SPA).

* _Daisy UI_ is used as the primary styling framework; it provides a level of abstraction (and therefore consistency) over _Tailwind CSS_.

* _SCSS_ is used to create and manage custom styling via dynamic stylesheets.

### Analytics and Logging

* _MixPanel_ is used to track user actions.
* _Hotjar_ is used to capture user behaviour metrics.

### Authentication

* _Firebase Authentication_ is used for federated sign in.

### Data Storage

* _Firestore Database_ is used to store data in document collections.

### File Storage

* _Firebase Storage_ is used to store files. It is a wrapper over _Google Cloud Storage_, a managed cloud object storage service.

### Customer Feedback

* _Tawk.to_ is used to capture user feedback and have a live chat with visitors.

### Subscription and Billing

* _Firebase Functions_ are used to automatically create a user profile in the database.

### User Alerts

Saas Chariot uses a number of ways to notify users about an event:

* In-App Notifications:
  * Popup Alerts
  * Toast Notifications

Note: Currently, In-App Notifications only originate from the frontend.

* Email Notifications:
  * 

## Folder Structure

Application source code is stored in the `src` folder.

Structure of the `src` folder is inspired by [this](https://blog.webdevsimplified.com/2022-07/react-folder-structure/) guide:

* `assets` contains anything that isn't code:
  * `images`
  * `icons`
  * `fonts`
  * `styles` is where SCSS stylesheets are stored. Make sure to `@import` all global stylesheets in `main.scss`.

* `components` contains SFCs (`<component-name>.vue`, where `<component-name>` is in PascalCase") used across the project, organised into the following subfolders:
  * `ui` to store UI components like cards, modals, and buttons.
  * `form` to store components specifically used in forms such as checkboxes, inputs, date pickers, etc.
  * `layouts` to store reusable layout components such as sidebars, navigation bars, containers, etc.
  * `modals` to store modals implemented using `<Modal></Modal>` as root component, shown using the ModalStack plugin's `$showModal(<component>, <component props as obj>)` function.

* `configs` contains _interfaces_ to application configurations; the configurations themselves are passed into Vite as [environment variables](https://vitejs.dev/guide/env-and-mode).

* `data` is used to store data assets such as JSON files.

* `state` is used to store global state in the form of Pinia stores.

* `features` contains one folder for each feature in the application. Each feature folder may contain:
  * (any folders listed here, apart from global folders such as `features`, `plugins` and `state`.)

* `libraries` contains facades/abstractions for the various different libraries used in the project. Using facades means libraries don't have to be directly imported into rest of application codebase multiple times, making it easier to update/replace library or customise it for own use.

* `plugins` contains Vue plugins; Vue plugins are always applied globally.

* `pages` contains SFCs, each SFC represents a unique page (`<page-name>.vue`) where `<page-name>` is in "PascalCase".
  * If the page SFC must use other SFCs that will only be used on the page, create a folder called `<page-name>`, store the page SFC as `<page-name>.vue` and others as `<component-name>.vue`.
  * It may be helpful to organise pages into arbitrary folders, in which case the name of such a folder must abide by the generic "kebab-case" used throughout the project (with exception of Vue components including pages).

* `services` contains code used to interface with external APIs (instead of litering rest of application codebase with API interaction code).

* `utilities` contains files that export simple [pure functions](https://blog.webdevsimplified.com/2020-09/pure-functions) such as formatters that do not cause side effects.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Things To Do

* Move `plugins` to `framework_features`
* Auto-import all plugin features
* Update docs
