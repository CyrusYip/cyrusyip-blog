---
title: Run Different Versions of Hugo without Installation via npx
date: '2023-12-20'
slug: run-different-hugo-versions
tags:
  - Hugo
  - npm
  - npx
lastmod: 2024-05-09T09:32:42+08:00 # remove this line if the content is actually changed
---

`npx` lets you run different versions of Hugo without installation. To use it, install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) at first.

## Run different versions

The syntax of `npx` is `npx <package-name>@<version>`. If `@<version>` is not specified, the locally installed version or latest version will be used. Here are some examples:

```bash
# local installed version or latest version
npx hugo-extended
# Hugo latest
npx hugo-extended@latest
# Hugo v0.121.0
npx hugo-extended@0.121.0
npx hugo-extended@0.121.0 version
npx hugo-extended@0.121.0 server
# Hugo v0.99.1
npx hugo-extended@0.99.1 version
```

Available versions are listed [here](https://www.npmjs.com/package/hugo-extended?activeTab=versions). Oldest version is 0.63.2. If you want to use the older versions, use [hugo-bin](https://www.npmjs.com/package/hugo-bin) package instead. Its version doesn't match the Hugo version, so you have to check its [commit history](https://github.com/fenneclab/hugo-bin/commits/main/package.json).

```bash
# Hugo v0.121.0
npx hugo-bin@0.117.0 version
```

## Install a specific version

You can install a specific version of Hugo in a git repository.

```bash
cd cyrusyip-blog
# install Hugo v0.99.1
npm install --save-dev hugo-extended@0.99.1
# ignore local npm packages
echo 'node_modules' >> .gitignore
# commit change
git add --all
git commit --message 'add Hugo'
# use
npx hugo version # Hugo v0.99.1
```

To change the version, run install command again.

```bash
npm install --save-dev hugo-extended@0.125.5
npm install --save-dev hugo-extended@latest # latest version
```

If you clone the repository, install Hugo before using it.

```bash
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
cd cyrusyip-blog
npm install
npx hugo version # Hugo v0.99.1
```

## Clean cache

```bash
# clean npx cache
npx clear-npx-cache
# clean npm cache
npm cache clean --force
```

## Note about package-lock.json

By default, the directory name of source code will be shown in the name field in `package-lock.json`. To override that, set name field in `package.json` and run `npm install`.

Example of `package.json`:

```json
{
  "name": "cyrusyip-blog",
  "devDependencies": {
    "hugo-extended": "^0.125.6"
  }
}
```

---

This tutorial was tested with npm/npx v10.5.2 and Node.js v21.7.3 on Arch Linux.
