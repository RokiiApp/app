# @rokii/build

## [2.0.3](https://github.com/RokiiApp/app/compare/build-v2.0.2...build-v2.0.3) (2024-02-19)


### Bug Fixes

* update core packages ([0f06250](https://github.com/RokiiApp/app/commit/0f06250c60db08cb6a73c1e88871a187f2310fdc))

## 2.0.2

### Patch Changes

- 6a66c39: Use css-modules v2.7 as 3 is broken on windows

## 2.0.1

### Patch Changes

- a701fa2: update important deps (esbuild)
- 8a89fdc: Update core deps
- 83ef7eb: Remove css module plugin

## 2.0.0

### Major Changes

- 2426d0e: Update build package to support _only_ the tauri version of Rokii.

  The path to the symlink has changed and also the way we get the name of the plugin (without scope)

### Patch Changes

- 1eeb4f3: Prepare packages for monorepo with plugins

  Also linked dependencies to root package.json so they use the same versions for react, typescript...

## 1.0.1

### Patch Changes

- 292baf3: Update minor deps
