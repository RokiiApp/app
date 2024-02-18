# @rokii/ui

## 2.0.4

### Patch Changes

- rename parameter of invoke function and get image from Rokii api

## 2.0.3

### Patch Changes

- fa60cc5: fix bundling problems

## 2.0.2

### Patch Changes

- 4cf3e5b: Bundle for vrowser, not node
- 8a89fdc: Update core deps

## 2.0.1

### Patch Changes

- 1eeb4f3: Prepare packages for monorepo with plugins

  Also linked dependencies to root package.json so they use the same versions for react, typescript...

## 2.0.0

### Major Changes

- adb69e2: Prepare packages for migration to Tauri

  Removed electron remote from @rokii/ui, deleted some types from the settings.

  Also added a command to get the icons in windows. The command invokes a native code in the tauri app.

### Patch Changes

- 292baf3: Update minor deps

## 1.0.2

### Patch Changes

- fix dynamic styles with css vars

## 1.0.1

### Patch Changes

- 51af9a5: Solved bundling issues and type definitions
