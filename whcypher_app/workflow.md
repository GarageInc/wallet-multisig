# Development workflow

In workflow we use two branches to record the history of the project. The "main" branch stores the official release history, and the "develop" branch serves as an integration branch for features. It's also convenient to tag all commits in the "main" branch with a version number.
"develop" branch will contain the complete history of the project, whereas "main" will contain an abridged version.

![](https://wac-cdn.atlassian.com/dam/jcr:a13c18d6-94f3-4fc4-84fb-2b8f1b2fd339/01%20How%20it%20works.svg?cdnVersion=31)

## Feature branches

"feature" branches use develop as their parent branch.
When a "feature" is complete, it gets merged back into "develop". Features should never interact directly with "main".

![](https://wac-cdn.atlassian.com/dam/jcr:34c86360-8dea-4be4-92f7-6597d4d5bfae/02%20Feature%20branches.svg?cdnVersion=31)

## Release branches
Once "develop" has acquired enough features for a release (or a predetermined release date is approaching), you fork a "release" branch off of "develop". Creating this branch starts the next release cycle, so no new features can be added after this point - only bug fixes, documentation generation, and other release-oriented tasks should go in this branch. Once it's ready to ship, the "release" branch gets merged into "main" and tagged with a version number. In addition, it should be merged back into "develop", which may have progressed since the "release" was initiated.

Like "feature" branches, "release" branches are based on the "develop" branch. Making "release" branche:
```git checkout -b release/0.1.0```

![](https://wac-cdn.atlassian.com/dam/jcr:8f00f1a4-ef2d-498a-a2c6-8020bb97902f/03%20Release%20branches.svg?cdnVersion=31)

Once the "release" is ready to ship, it will get merged it into "main" and "develop", then the "release" branch will be deleted.

## Merging to "main" branch
Direct merging to "main" branch is blocked, so you should create PR, which needs at least one approve from other developer to be merged.
