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

## Context


To give context on the actual project where I first encountered the bug:
- I'm building a component library (does not actually use React).
- The code is authored as an ESM module (hence the repro repo being explicit about it in `package.json` and also having to use `.cjs` for some Cypress related setup to get the test runner working).
- I'm using `@cypress/react` and the component test runner for its delightful testing experience.  That has been superb, it's just the last stretch of figuring out coverage that I'm hitting a wall.  As a result, while React is not a dependency of the library I'm writing, it is a dev dependency for my tests.  I definitely do not use `create-react-app`, and therefore have a custom `.webpack.config.cjs` and `.babelrc` in the `cypress/` folder.

I don't fully understand why code coverage is not working, but some suspicions I have if they are helpful for the debugger:
- Maybe it's related to my package being ESM-only? (i.e. `"type": "module"` required in `package.json`).
- Maybe `@cypress/react` does not interoperate well with `@cypress/code-coverage` with ESM (as mentioned in the earlier point)?
- Maybe it's related to peer dependency versions that I have installed (I simply installed the latest).
- Maybe I'm completely missing something despite spending days iterating on variations from the official docs (which has a very simple setup!).
