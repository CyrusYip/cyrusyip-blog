---
title: How to Enable Per-App Language Preferences for Every App
date: 2025-10-18T00:00:00+08:00
slug: enable-per-app-language-preferences
tags:
  - android
lastmod: 2025-10-18T00:00:00+08:00
---

Android 13 introduces [Per-app language preferences](https://developer.android.com/guide/topics/resources/app-languages), which allows you to set different languages for different apps. It is a useful feature in Android, but it's not available for all apps. Fortunately, we can enable this feature for every app.

1. Enable [developer options](https://developer.android.com/studio/debug/dev-options).
1. Enable USB debugging in developer options.
1. Connect your phone to your PC and run the following command: 

    ```shell
    adb shell settings put global settings_app_locale_opt_in_enabled false
    ```

If the command does not work for your device's operating system (e.g. HyperOS), try [Language Selector](https://github.com/VegaBobo/Language-Selector/releases) instead.

---

Reference: [How to make every app appear in Android 13's new per-app language settings : r/Android](https://www.reddit.com/r/Android/comments/wrlgh2/how_to_make_every_app_appear_in_android_13s_new/)
