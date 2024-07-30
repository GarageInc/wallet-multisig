# cosigner

https://developer.chrome.com/docs/extensions/

# RUN

yarn install
yarn start

# Release new version

Push changes to `develop` branch

```
git checkout develop
```

Last commit should be a version bump in `package.json`, `configs/manifest.json`, `config/manifest.prod.json`
Then `yarn`
Save and push

```
git add .
git commit -m "Version bump"
git push
```

Create a PR to `master` branch
Merge `develop` to `master`

Switch to master `git checout master` and pull latest version `git pull`
Then create a tag `git tag -a VERSION`
Then push tags `git push --tags`

After that `yarn build`
After that `yarn zip`

## Project structure

`src` folder contains the main code base. It contains 3 folders:

* app
* content
* serviceWorker

### app folder

`app` folder contains all files related to UI (that is shown in extension popup and window popup). It has subfolders:

* components - This contains elements that are reused on multiple pages
* constants - Contains files that contains various constants that are used in different places of the application. Filles are names according to their context.
* static - Contains any files that are not meant to be changed and are not executable (ie. fonts and images)
* helpers - This folder contains method snippets performing some data transformation, grouped by files, named accordingly to their respective domain use
* hooks - Different logic snippets that are used in react module context. They contain application specific logic
