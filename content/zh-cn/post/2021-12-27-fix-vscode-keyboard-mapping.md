---
title: 修复键盘映射在 VS Code 失效的问题
date: '2021-12-27'
slug: fix-vscode-keyboard-mapping
tags:
  - Visual Studio Code
---

[我将 Caps 键改为 Esc 键之后](/zh-cn/post/2021/12/27/kde-plasma-swap-caps-and-esc/)，在 VS Code 设置就失效了。修复方法：按下 `Ctrl + ,` 打开设置，找到 `Keyboard: Dispatch`，将其改为 `keyCode`。

---

参考资料：[Howto: Fix Caps Lock Escape Swap Not Working in VS Code](https://linuxdev.io/howto-fix-caps-lock-escape-swap-not-working-in-vs-code/)