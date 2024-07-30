# Develop localy

In this project:
`npm link`

In Target project:
`npm link @whalesheaven/chain-service`

# Deploy

In development brunch, after submitted all changes and tested this changes

Bump a version in `package.json`
Then

```
yarn
git add .
git commit -m "Version bump"
git push
```
In master brunch, after development branch is merged

Then create a tag `git tag -a VERSION`
Then push tags `git push --tags`

In target repo 

Bump chain service version in dependencies
