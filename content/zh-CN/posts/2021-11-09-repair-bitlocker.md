---
title: 修复 BitLocker 错误：The system cannot find the file specified
date: 2021-11-09T00:00:00+08:00
slug: repair-bitlocker
tags:
  - windows
lastmod: 2022-06-06T00:29:26+08:00
---

用 BitLocker 给 Windows 10 加密时出现了错误信息：The system cannot find the file specified。这个提示信息简直是废话嘛，为什么不告诉我哪个文件有问题……提示信息还附上了 [Win10 安装要求](https://www.microsoft.com/en-us/windows/windows-10-specifications)，一样是没用……

谷歌之后找到了[解决办法](https://social.technet.microsoft.com/Forums/windows/en-US/51947c62-dbcb-4613-b10d-707ff8b61d0d/bitlocker-quotthe-system-cannot-find-the-file-specifiedquot)：把 `C:\Windows\System32\Recovery\ReAgent.xml` 重命名为 `ReAgent.xml.old`。
