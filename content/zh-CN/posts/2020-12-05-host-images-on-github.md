---
title: GitHub/jsDelivr 图床教程
date: 2020-12-05T00:00:00+08:00
slug: host-images-on-github
tags:
  - blog
  - github
lastmod: 2024-05-09T01:55:39+08:00
---

因为在博客的源代码仓库加图片（二进制文件）会导致仓库变大，所以我就把图片放到另一个仓库，直接使用链接来引用图片。

1. [新建公共仓库](https://github.com/new)[^why public]

    勾选 `Add a README file`，这样待会就可以直接使用了，点击 `Create repository`

1. 克隆仓库

    ```shell
    git clone git@github.com:your-username/repo-name.git
    ```

1. 添加一些图片到仓库

1. 上传图片

    ```shell
    #!/usr/bin/env sh
    git add --all
    git commit -m "update"
    git push
    ```

1. 获取链接

    我们可以使用 GitHub 的链接或者 jsDelivr CDN，前者在中国被封禁，后者还能用。jsDelivr 会缓存文件，如果更新了文件，需要[清除缓存](https://www.jsdelivr.com/tools/purge)。

    - GitHub 链接规则：`https://raw.githubusercontent.com/${用户名}/${仓库名}/${分支名}/${路径}`
    - jsDelivr 链接规则：`https://cdn.jsdelivr.net/gh/${用户名}/${仓库名}@${分支名}/${路径}`
    - jsDelivr 清除缓存链接规则：`https://purge.jsdelivr.net/gh/${用户名}/${仓库名}@${分支名}/${路径}`。
    
    举个例子，<https://github.com/CyrusYip/blog-static/blob/main/images/2020-11-06_fcitx5-unicode.gif> 这个文件对应的链接为：
    
    - GitHub：<https://raw.githubusercontent.com/CyrusYip/blog-static/main/images/2020-11-06_fcitx5-unicode.gif>
    - jsDelivr：<https://cdn.jsdelivr.net/gh/CyrusYip/blog-static@main/images/2020-11-06_fcitx5-unicode.gif>
    - jsDelivr 清除缓存：<https://purge.jsdelivr.net/gh/CyrusYip/blog-static@main/images/2020-11-06_fcitx5-unicode.gif>
    
    把链接放到 Markdown 文件里就可以使用了。比如：`![](https://raw.githubusercontent.com/CyrusYip/blog-static/main/images/2020-11-06_fcitx5-unicode.gif)`。

1. 删除文件请参考[《完全删除 Git 仓库的文件》](/zh-cn/posts/2021/01/25/git-remove-sensitive-data/)

自己手动拼凑链接太费劲，我写了个 [Bash 程序](https://github.com/CyrusYip/blog-static/blob/main/url.sh)来获取文件链接并将其写入 X11 剪贴板（使用 [fzf](https://github.com/junegunn/fzf) 模糊搜索，找文件很快）。

![搜索文件](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-12-05_demo-1.png)

![获取链接](https://cdn.jsdelivr.net/gh/CyrusYip/blog-static/images/2020-12-05_demo-2.png)

```bash
#!/usr/bin/env bash

# Get raw file links from current GitHub repository
# Dependencies: fzf and xclip
# This file should be placed at the root of a repository
# Guide (Chinese): https://cyrusyip.org/zh-cn/post/2020/12/05/host-images-on-github/

username="CyrusYip"
repo_name="blog-static"
branch_name="main"

get_url() {
  path=$(fzf)
  github="https://raw.githubusercontent.com/${username}/${repo_name}/${branch_name}/${path}"
  jsdelivr="https://cdn.jsdelivr.net/gh/${username}/${repo_name}@${branch_name}/${path}"
  jsdelivr_purge="https://purge.jsdelivr.net/gh/${username}/${repo_name}@${branch_name}/${path}"

  # copy all links so I can get them later
  copy_count=0
  echo "$github" | xclip -selection clipboard && copy_count=$((copy_count + 1))
  echo "$jsdelivr_purge" | xclip -selection clipboard && copy_count=$((copy_count + 1))
  echo "$jsdelivr" | xclip -selection clipboard && copy_count=$((copy_count + 1))
  [ $copy_count -eq 3 ] && echo "Links were successively copied."

  echo -e "\nLinks for the file:"
  echo "  $github"
  echo "  $jsdelivr"
  echo "  $jsdelivr_purge"
  echo -e "\nPress Ctrl-C to exit, Enter to contine..."
}

while true; do
  get_url
  read -r
done
```

建议遵守 GitHub 和 jsDelivr 的使用条款，以免服务终止。

- [GitHub 合理使用政策](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies)
- [jsDelivr 使用条款](https://www.jsdelivr.com/terms)（重点看 Prohibited Use）

[^why public]: 私人仓库需要令牌（token）访问图片，但是[令牌会自动刷新，刷新后就无法使用之前的网址](https://github.com/Molunerfinn/PicGo/issues/361#issuecomment-558994432)。想用私人仓库可以考虑使用 Cloudflare Pages 这样的 Jamstack 服务部署图片到子域名（例如 `images.cyrusyip.org`）。
