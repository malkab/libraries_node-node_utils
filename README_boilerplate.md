# Boilerplate for Node Libraries

This is the boilerplate to create Node libraries.


## Configuration Steps

Follow:

- [x] configure the **tmuxinator profile** and install it;

- [x] initialise **Git** and **Git Flow**;

- [x] check **libraryName** at **webpack.config.js**;

- [x] configure **package.json** and make initial install.


## Publishing Workflow

Steps:

- [] update package **README.md** and the description at **package.json**, if applicable;

- [] check for **console.log("D:** left behind;

- [] test **yarn build** and **yarn build-docs**;

- [] review changes with Git to get a clear idea of changes in the current version, but don't commit yet;

- [] for quick dev publish, use **yarn publish-dev** that will bump the patch version;

- [] for a release publish, test the package with **yarn pack** and then **yarn publish-prod**. Start new projects always at **version 0.0.1**. When reaching version 1.0.0, **0 or odd** minor versions means stable versions and **even** minor version number unstable ones. Only change major version changes on truly backward incompatible changes. **LET THE CODE MATURE BEFORE COMITTING ODD MINOR VERSION NUMBERS**;

- [] close the Git Flow feature and go back to **develop**, if any. Get a clear idea of changes in the current version;

- [] if applicable, create a new Git Flow Release;

- [] push all branches and tags to GitLab:

```Shell
# This will push ALL branches to origin, even the non-existant ones. Remove sporious branches with git push origin :branch_name
git push --all origin
git push --tags
git fetch -av --prune
git branch -av
```
