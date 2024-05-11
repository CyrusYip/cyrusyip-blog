#!/usr/bin/env node

// This file is used by Front Matter CMS
// Rename a file according to date and slug
// Example: 2024-4-25-i-hate-obscure-words.md
const { rename } = require("node:fs");
const { argv } = require("node:process");
const { extname, dirname, join } = require("node:path");

const arguments = argv;
if (arguments && arguments.length > 0) {
  // date: 2024-04-25T23:37:10+08:00 -> dateWithoutTime: 2024-04-25
  const { date, slug } = JSON.parse(arguments[4]);
  const dateWithoutTime = date.split('T')[0]
  const oldPath = arguments[3];
  const newFilename = dateWithoutTime + "-" + slug + extname(oldPath);
  const newPath = join(dirname(oldPath), newFilename);
  if (oldPath === newPath) {
    console.log("No need to rename file");
  } else {
    rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log("New filename: " + newFilename);
    });
  }
  // console.log("Old path: " + oldPath);
  // console.log("New path: " + newPath);
  // console.log("New filename: " + newFilename);
}
