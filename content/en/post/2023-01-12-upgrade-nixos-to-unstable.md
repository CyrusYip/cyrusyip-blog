---
title: Upgrading NixOS to Unstable Channel
date: '2023-01-12'
slug: upgrade-nixos-to-unstable
lastmod: 2023-01-12T01:25:13+08:00 # remove this line if the content is actually changed
---

As an Arch Linux user, I am used to using the lastest packages. Thus, I upgrade my NixOS to unstable channel.

```shell
# switch channel
sudo nix-channel --add https://nixos.org/channels/nixos-unstable nixos
sudo nixos-rebuild switch --upgrade
# show version
nixos-version
```

References:

- [Upgrading NixOS - NixOS manual](https://nixos.org/manual/nixos/stable/index.html#sec-upgrading)
- <https://channels.nixos.org/>
