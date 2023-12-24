---
title: Run Different Versions of Hugo without Installation via npx
date: '2023-12-20'
slug: run-different-hugo-versions
tags:
  - Hugo
  - npm
  - npx
---

`npx` lets you run different versions of Hugo without installation. To use it, install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) at first.

## Run different versions

The syntax of `npx` is `npx <package-name>@<version>`. If `@<version>` is not specified, the locally installed version or latest version will be used. Here are some examples:

```bash
# local installed version or latest version
npx hugo-extended
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
npm install hugo-extended@0.99.1
# ignore local npm packages
echo 'node_modules' >> .gitignore
# commit change
git add --all
git commit --message 'add Hugo'
# use
npx hugo version # Hugo v0.99.1
```

If you clone the repository, install the Hugo before using it.

```bash
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
cd cyrusyip-blog
npm install
npx hugo version # Hugo v0.99.1
```

---

## Clean cache

```bash
# clean npx cache
npx clear-npx-cache
# clean npm cache
npm cache clean --force
```

---

This tutorial was tested with npm/npx v10.2.4 and Node.js v21.2.0 on Arch Linux.