---
title: Fixing File Permission Problem of Jellyfin on Arch Linux
date: '2023-01-11'
slug: fix-jellyfin-permission
tags:
  - Arch Linux
  - Linux
  - Jellyfin
---

This tutorial should work for other Linux distributions, but I only tested it on Arch Linux.

In order to add a directory to a Jellyfin library, Jellyfin needs to access the directory and all its parent directories. If you add `~/Videos` to a library, Jellyfin fails to access it. Jellyfin runs as user `jellyfin`. Jellyfin can access `~/Videos` (`other::r-x`) but can't access its parent `~` (`other::---`).

```
❯ getfacl ~/Videos
getfacl: Removing leading '/' from absolute path names
# file: home/cyrusyip/Videos
# owner: cyrusyip
# group: cyrusyip
user::rwx
group::r-x
mask::r-x
other::r-x

❯ getfacl ~
getfacl: Removing leading '/' from absolute path names
# file: home/cyrusyip
# owner: cyrusyip
# group: cyrusyip
user::rwx
group::---
mask::---
other::---
```

To fix it, grant Jellyfin execution permission for the home directory.

```
setfacl --modify user:jellyfin:--x ~
```

Now, Jellyfin can access not only `~/Videos` but also other directories under `~`, which is unsafe. We only want Jellyfin to access necessary directories. We'd better remove the permission for Jellyfin and create a dedicated directory for it. 

```
setfacl --remove u:jellyfin ~
sudo mkdir /media
sudo chown $USER: /media
```

---

References:

- [Jellyfin#File_permission - ArchWiki](https://wiki.archlinux.org/title/Jellyfin#File_permission) (Actually, [I wrote this section](https://wiki.archlinux.org/index.php?title=Jellyfin&type=revision&diff=763685&oldid=702260))

Further reading:

- [File permissions and attributes - ArchWiki](https://wiki.archlinux.org/title/File_permissions_and_attributes)
- [Users and groups - ArchWiki](https://wiki.archlinux.org/title/Users_and_groups)
- [Access Control Lists - ArchWiki](https://wiki.archlinux.org/title/Access_Control_Lists)
- [Comment from u/jcdick1](https://www.reddit.com/r/jellyfin/comments/10992x3/comment/j3xm596/?utm_source=share&utm_medium=web2x&context=3)
