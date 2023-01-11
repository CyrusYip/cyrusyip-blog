---
title: How to Allow Jellyfin to Access the Home Directory on Arch Linux
date: '2023-01-11'
slug: fix-jellyfin-permission
tags:
  - Arch Linux
  - Linux
  - Jellyfin
---

This tutorial should work for other Linux distributions, but I only tested it on Arch Linux.

Jellyfin runs as user `jellyfin`, which has no permission for your home directory. If you add a directory inside your home directory to a library, Jellyfin fails to access it. To fix it, grant Jellyfin execution permission for your home directory.

```
setfacl --modify user:jellyfin:--x ~
```

To remove the permission, run:

```
setfacl --remove u:jellyfin ~
```

---

References:

- [Jellyfin#File_permission - ArchWiki](https://wiki.archlinux.org/title/Jellyfin#File_permission) (Actually, [I wrote this section](https://wiki.archlinux.org/index.php?title=Jellyfin&type=revision&diff=763685&oldid=702260))

Further reading:

- [File permissions and attributes - ArchWiki](https://wiki.archlinux.org/title/File_permissions_and_attributes)
- [Users and groups - ArchWiki](https://wiki.archlinux.org/title/Users_and_groups)
- [Access Control Lists - ArchWiki](https://wiki.archlinux.org/title/Access_Control_Lists)
