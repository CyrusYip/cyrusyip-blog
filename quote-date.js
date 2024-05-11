#!/usr/bin/env node
// This file is obsolete because it's okay not to have quotes around the dates
// This file is used by Front Matter CMS
// Add single quotes to date to keep the weirdness introduced by blogdown (https://d.cosx.org/d/425173-yong-blogdown-chuang-jian-tie-zi-wei-shi-yao-ri-qi-dai-dan-yin-hao/3)
// date: 2024-04-25 -> date: '2024-04-25'

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
