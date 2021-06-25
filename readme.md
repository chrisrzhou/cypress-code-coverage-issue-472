# @cypress/code-coverage #472

This is the bug repro for https://github.com/cypress-io/code-coverage/issues/472.

## Context

It is a minimal example with the following requirements:
- Is an ESM module
  - i.e. `"type": "module"` is explicitly marked in the `package.json`
  - appropriate Cypress files need to be marked as `.cjs` in order for the tests to run.
    In `cypress/plugins/index.cjs` and fields in `cypress.json`.
- Uses component testing (i.e. `@cypress/react` and using `open-ct` and `run-ct` test runners).
- Uses code coverage (i.e. `@cypress/code-coverage` and `babel-plugin-istanbul` based on the official docs for instrumentation).

The requirements above are needed in the actual bug faced in the project, so the repo is capturing the minimal configuration of reproducing the same bug.

## Reproduce
```
npm i
npm test
```

The test runner runs fine, and tests the code correctly.

### Expected Behavior

Code coverage to output something meaningful in `.nyc_output/out.json`

### Actual Behavior

`.nyc_output/out.json` is an empty object.  The test runner complains that the code is not instrumented.
