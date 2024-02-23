> [!IMPORTANT]
> This page is oriented to **developers**. If you are a user, you might want
> to check the [official website](https://rokii.app) or the main [README](../README.md).

# Rokii documentation 🔍

> [!NOTE]
> If you are willing to create an extension,
> you should read the [extensions documentation](https://github.com/rokiiapp/developers).

## Running the app locally

### Prerequisites

Rokii has been built using [Tauri v1](https://tauri.app),
so you will need to follow their [requisites](https://tauri.app/v1/guides/getting-started/prerequisites).

Once you meet the requirements, you can clone the repository with:

```bash
gh repo clone rokiiapp/app
```

Open the repo in your terminal and then install the dependencies with:

```bash
pnpm i
```

### Running the app

Once you have installed the dependencies, you can run the app with:

```bash
pnpm tauri dev
```

## 🚀 Development

### Project structure

This repository is a monorepo, which means that it contains multiple packages.
The Rokii app is located in the `app` directory, and the rest of the packages are
located in the `packages` directory.

#### `app`

This directory contains the main Rokii app. The app is built using [Tauri](https://tauri.app),
which is a framework for building desktop apps with web technologies.
The frontend is built using [react](https://reactjs.org), and the backend is built
using [rust](https://www.rust-lang.org).

Following the Tauri conventions, the code is split into two directories:

- `src`: directory containing the frontend code. (Typescript + React)
- `src-tauri`: directory containing the backend code. (Rust)

#### `packages`

This directory contains the rest of the packages, which are:

- `@rokii/api`: Types and utilities for the Rokii API (the one exposed to extensions)
- `@rokii/ui`: Shared components and styles used in the app.
- `@rokii/utils`: This package contains the shared utilities used in the app.

## ⚖️ License

MIT © 2024 David Jiménez
