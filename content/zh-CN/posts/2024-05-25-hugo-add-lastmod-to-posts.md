---
title: Hugo：给文章添加 lastmod（上次修改时间）
date: 2024-05-25T00:00:00+08:00
slug: hugo-add-lastmod-to-posts
tags:
  - blog
  - hugo
lastmod: 2024-06-07T11:00:41+08:00
---

背景：本站文章的 lastmod（上次修改时间）就是 Git 提交的 author date（作者日期）。我需要批量修改文章（[Hugo：补全文章的 ISO 8601 日期](/zh-cn/posts/2024/05/25/hugo-complete-iso8601-date/)），这会导致所有文章的 lastmod 都变成今天。文章内容没变就不应该改 lastmod，所以我打算给每篇文章都加上 lastmod，后面改动文章就 lastmod 就不会变。

---

先把 lastmod 的优先级调至最高，不然 Hugo 会继续使用 Git 提交日期。

```toml
# config.toml
[frontmatter]
  lastmod = ['lastmod', ':default']
```

在根目录新建 `add-lastmod.sh`，添加执行权限

```shell
touch add-lastmod.sh
chmod +x add-lastmod.sh
```

往 `add-lastmod.sh` 填入脚本内容。

```bash
#!/usr/bin/env bash
# usage: ./add-lastmod.sh directory-name
directory="$1"
files=$(find "$directory" -type f)
for file in $files; do
  echo "${file}"
  lastmod_date=$(git log --no-show-signature -1 --format=%aI "$file") # example: 2024-05-16T14:23:53+08:00
  echo "$lastmod_date"
  # Use awk to insert the lastmod line above the second ---
  awk -v lastmod="lastmod: $lastmod_date # remove this line if the content is actually changed" '
  BEGIN { frontmatter = 0 }
  /^---$/ { frontmatter++ }
  frontmatter == 2 && !printed { print lastmod; printed = 1 }
  { print }
  ' "$file" >tmpfile && mv tmpfile "$file"
done
```

修改前先构建网站，后面用于对比。

```shell
rm --recursive public/
hugo
mv public public-original
```

添加 lastmod。

```shell
./add-lastmod.sh content
```

再次构建网站。

```shell
hugo
mv public public-changed
```

使用文件对比工具（我用的是 [Kompare](https://apps.kde.org/kompare/)）对比 `public-original` 和 `public-changed`，结果完全相同。

预览，稍微和 <https://cyrusyip.org/> 对比一下，看起来一样。

```shell
hugo server
```

删除构建的网站。

```shell
rm --recursive public public-original public-changed
```

查看差异后提交改动。

```shell
git diff
git add --update
git commit --message 'chore: add lastmod before changing date'
```

删除脚本。

```shell
rm add-lastmod.sh
```

