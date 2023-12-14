#!/usr/bin/env node

// This file is used by Front Matter CMS
// Rename a file according to date and slug
const { rename } = require("node:fs");
const { argv } = require("node:process");

const arguments = argv;
if (arguments && arguments.length > 0) {
  const frontMatter = JSON.parse(arguments[4]);
  const oldPath = arguments[3];
  const extension = oldPath.match(/.+(\..+)$/)[1];
  const newFilename = frontMatter.date + "-" + frontMatter.slug + extension;
  const newPath = oldPath.replace(/(.+\/)(.+)/, `$1${newFilename}`);
  if (oldPath === newPath) {
    console.log("No need to rename file");
    return null;
  }
  rename(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log("New filename: " + newFilename);
  });
  // console.log("Old path: " + oldPath);
  // console.log("New path: " + newPath);
}
