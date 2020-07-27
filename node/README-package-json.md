# package.json Scripts

Remember that for building the NPM package of the library the
**build-npm-package.sh** script should be run. Then modify version at
**package.json** and **npm publish**.

There are some that are service targets, but the important ones are:

-   **start:** runs and watch the Mocha tests at src/test;

-   **quick-test:** runs and watch the src/test/00-quick-test.ts script
    for quick testing.

Sometimes, specially the first time the repo is cloned and there is no
previous build, a bootstraps build needs to be done to support the usual
scripts:

```bash
npm run build
```



## Service Scripts

These aren't meant to be run directly, but a documentation hasn't harmed
anybody so far:

-   **build-lib:** launch the Webpack production processing of the
    library;

-   **build:** builds the library and the quick test for development;

-   **service:watch:quick-test:server:** nodemons the execution of
    00-quick-test.js;

-   **service:watch:mocha:server:** nodemons the execution of mocha.js;

-   **builddocs:html:** builds the HTML doc;

-   **builddocs:markdown:** builds the Markdown doc;

-   **builddocs:** builds all docs.
