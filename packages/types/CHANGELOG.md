# @rokii/types

## 4.0.0

### Major Changes

- cbf4887: Make API consistent and usable for the new rokii

### Patch Changes

- 8a89fdc: Update core deps

## 3.0.1

### Patch Changes

- 1eeb4f3: Prepare packages for monorepo with plugins

  Also linked dependencies to root package.json so they use the same versions for react, typescript...

- de1feea: Fix initializeAsync type

## 3.0.0

### Major Changes

- adb69e2: Prepare packages for migration to Tauri

  Removed electron remote from @rokii/ui, deleted some types from the settings.

  Also added a command to get the icons in windows. The command invokes a native code in the tauri app.

### Patch Changes

- 292baf3: Update minor deps

## 2.0.0

### Major Changes

- f4fe0e5: Remove isMigratedPlugins setting

## 1.0.2

### Patch Changes

- Add multiple keywords option to plugin API

## 1.0.1

### Patch Changes

- 51af9a5: Solved bundling issues and type definitions
