#!/usr/bin/env node

// This file is used by Front Matter CMS
// Rename a file according to date and slug
const { rename } = require("node:fs");
const { argv } = require("node:process");
const { extname, dirname, join } = require("node:path");

const arguments = argv;
if (arguments && arguments.length > 0) {
  const { date, slug } = JSON.parse(arguments[4]);
  const oldPath = arguments[3];
  const newFilename = date + "-" + slug + extname(oldPath);
  const newPath = join(dirname(oldPath), newFilename);
  if (oldPath === newPath) {
    console.log("No need to rename file");
    return;
  }
  rename(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log("New filename: " + newFilename);
  });
  // console.log("Old path: " + oldPath);
  // console.log("New path: " + newPath);
  // console.log("New filename: " + newFilename);
}
