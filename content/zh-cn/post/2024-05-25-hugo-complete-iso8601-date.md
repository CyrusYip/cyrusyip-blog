---
title: Hugo：补全文章的 ISO 8601 日期
date: 2024-05-25T00:00:00+08:00
slug: hugo-complete-iso8601-date
tags:
  - Hugo
  - blog
lastmod: 2024-06-07T11:01:08+08:00
---

## 背景

本网站使用 Hugo 构建，文章日期（date）是这样的：

```
date: '2020-10-02'
```

这里缺少了时间和时区。于是我给全部文章都设置了同一个时区（时间没填就是 00:00:00），但这个办法有隐患。如果我在另一个时区写文章，这时新的文章还是使用了旧时区。所以最好在每篇文章写上日期、时间和时区。

Hugo 日期的格式为 [ISO 8601](https://zh.wikipedia.org/zh-cn/ISO_8601)，示例：

```
date: 2020-10-02T00:00:00+08:00
```

补全日期的方法就是去掉引号[^hao]、补上 `T00:00:00+08:00`。`T00:00:00`  是时间，`+08:00`是时区。

[^hao]: 日期的引号去不去都行，我觉得不用更简洁就选择去掉。

修改日期前先[给全部文章加上 lastmod（上次修改时间）](/zh-cn/post/2024/05/25/hugo-add-lastmod-to-posts/)，不然修改日期后 lastmod 全部变成今天了。

## 操作流程

在根目录新建 `use-iso8601-date.sh`，添加执行权限。

```shell
touch use-iso8601-date.sh
chmod +x use-iso8601-date.sh
```

在 `use-iso8601-date.sh` 填入脚本内容。

```bash
#!/usr/bin/env bash
# usage: ./use-iso8601-date.sh directory-name
directory="$1"
files=$(find "$directory" -type f)
for file in $files; do
  sed -i "s|date: '\(.*\)'|date: \1T00:00:00+08:00|g" "$file"
  sed -i 's|date: "\(.*\)"|date: \1T00:00:00+08:00|g' "$file"
done
```

修改前先构建网站，后面用于对比。

```shell
rm --recursive public/
hugo
mv public public-original
```

补全日期。

```
./use-iso8601-date.sh content
```

删除时区配置。

```toml
# config.toml

# 删掉下面这行
timeZone = "Etc/GMT-8"
```

再次构建网站。

```
hugo
mv public public-changed
```

使用文件对比工具（我用的是 [Kompare](https://apps.kde.org/kompare/)）对比 `public-original` 和 `public-changed`，有一处差异：`/en/post/2023/11/06/hugo-top-level-404/` 文内代码块的日期也被修改了。这样改也没错。

预览，稍微和 <https://cyrusyip.org/> 对比一下，看起来一样。

```shell
hugo server
```

删除构建的网站。

```
rm --recursive public public-original public-changed
```

查看差异后提交改动。

```
git diff
git add --update
git commit --message 'feat: use ISO 8601 date'
```

删除脚本。

```shell
rm use-iso8601-date.sh
```

