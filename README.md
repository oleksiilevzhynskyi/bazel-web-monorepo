# This is an example of a Bazel-based web application made for talk ["How to Use Bazel to Manage Monorepos: The Grammarly Front-End Team's Experience"](https://fwdays.com/en/event/js-autumn-fwdays-2021/review/how-to-use-bazel-to-manage-monorepos-the-grammarly-front-end-teams-experience)

## The project structure

- `WORKSPACE.bazel` represents the Bazel project and specifies the Bazel version, npm dependencies, and general configuration. The common practice is to use "@npm" namespace for all npm dependencies; namespace is defined by `yarn_install(name = "npm")` in WORKSPACE.bazel file
- `.bazerc` contains cli bazel config. Here you may define a custom group of configurations for CI, build so on. You can find "debug" config here that enabled verbose more for CLI commands - add `--config=debug` for any cmd
- `packages/` - the dir with internal packages
- `packages/utils` is a simple utility package built with typescript
- `packages/webapp` is a site built with webpack
- `tools/` contains common bazel macros for jest, tsc and webpack builds

## How to run

### Webapp

- `yarn bazel build //packages/webapp` - build
- `yarn ibazel run //packages/webapp:serve` to run in incremental mode with a local dev server. The site is available at http://localhost:8080
- `yarn bazel test //packages/webapp:test` - tests

### Utils

- `yarn bazel build //packages/utils` - build
- `yarn ibazel build //packages/utils` - incremental build
- `yarn bazel test //packages/utils:test` - tests

### Bulk commands

- `yarn bazel build //...` - Build everything
- `yarn bazel test //...` - Test everything

## Where the output and how to debug

By default Bazel build everytings in own "root", build outputs are placed under `./bazel-out/darwin-fastbuild/bin/packages/utils` (macOS) or `./bazel-out/k8-fastbuild/bin/packages/utils` (linux).

Also, you may build any package in a debug more to inspect the sandbox `yarn bazel build //packages/utils --sandbox_debug`.
