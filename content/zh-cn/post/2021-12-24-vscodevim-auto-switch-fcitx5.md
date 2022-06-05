---
title: VSCodeVim 自动切换 Fcitx5
date: '2021-12-24'
slug: vscodevim-auto-switch-fcitx5
tags:
  - Fcitx5
  - Visual Studio Code
---

在 `$HOME/.config/Code/User/settings.json` 加入以下内容：

```json
{
  "vim.autoSwitchInputMethod.obtainIMCmd": "/usr/bin/fcitx5-remote",
  "vim.autoSwitchInputMethod.switchIMCmd": "/usr/bin/fcitx5-remote -t {im}",
  "vim.autoSwitchInputMethod.enable": true,
  "vim.autoSwitchInputMethod.defaultIM": "1",
}
```

或者按下 `Ctrl + ,` 用图形界面设置对应选项。这样退出插入模式时会将 Fcitx5 切换为英文。

---

参考文章：[在 VSCode 的 Vim keybinding 下自動切換 fcitx 模式 | by DanSnow | Medium](https://medium.com/@dododavid006/%E5%9C%A8-vscode-%E7%9A%84-vim-keybinding-%E4%B8%8B%E8%87%AA%E5%8B%95%E5%88%87%E6%8F%9B-fcitx-%E6%A8%A1%E5%BC%8F-39921d737416)