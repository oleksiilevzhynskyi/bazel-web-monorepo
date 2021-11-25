/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // PWD resolves to something like:
  // /private/var/tmp/_bazel/920d0e0b381cec6f5ed589db15bf533a/sandbox/darwin-sandbox/44/execroot/denali/bazel-out/darwin-fastbuild/bin/packages/app-config/unit.sh.runfiles/denali
  // which give us "execution workspace root" which contains current test target, and symlinks to all local(monorepo) dependencies for it
  rootDir: process.env.PWD,
  preset: "ts-jest",
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
};
