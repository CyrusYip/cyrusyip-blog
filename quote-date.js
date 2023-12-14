#!/usr/bin/env node
// This file is used by Front Matter CMS
// Add single quotes to date to keep the weirdness introduced by blogdown

const { readFile, writeFile } = require("node:fs");

const arguments = process.argv;
if (arguments && arguments.length > 0) {
  const path = arguments[3]; // The file path
  readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const result = data.replace(
      /(^---.+date: )(\d{4}-\d{2}-\d{2})(.+---)/s,
      "$1'$2'$3"
    );
    writeFile(path, result, (err) => {
      if (err) {
        console.error(err);
      }
    });
    // console.log(`path: ${path}`);
    // console.log(data);
    // console.log()
    // console.log(result);
  });
}
