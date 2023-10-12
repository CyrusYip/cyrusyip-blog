---
title: How to Fix Banking Apps / SafetyNet / Play Integrity on LineageOS without Root
date: '2023-10-10'
slug: lineageos-ih8sn
tags:
  - Android
  - LineageOS
translationKey: lineageos-ih8sn
---

## Summary

Flash ih8sn provided by [althafvly](https://github.com/althafvly/ih8sn) or your maintainer(s) via Lineage Recovery, and banking apps will work correctly.

## Explanation

When you use banking apps on LineageOS without root, they may show the misleading error message that your device is rooted. Banking apps actually check SafetyNet or Play Integrity, both of which are used to verify device integrity.

After flashing ih8sn, LineageOS will pass those two tests, banking apps won't complain any more, and Netflix will be available on Google Play. You can install YASNAC and Play Integrity API Checker to check. LineageOS will pass `Basic integrity` and `CTS profile match` on the former, `MEET_DEVICE_INTEGRITY` and `MEET_BASIC_INTEGRITY` on the latter.

This tutorial was tested on [Mi 11 LE (lisa)](https://wiki.lineageos.org/devices/lisa/variant3/) and [Mi 9 SE (grus)](https://wiki.lineageos.org/devices/grus/) on LineageOS 20.

<!--
ih8sn works on 20-20231007-NIGHTLY-lisa and 20-20231002-NIGHTLY-grus.
-->

Fun fact: ih8sn means **I** **ha**te **S**afety**N**et.
