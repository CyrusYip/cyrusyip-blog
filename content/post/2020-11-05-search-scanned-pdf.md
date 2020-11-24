---
title: 在扫描版 PDF 文档中查找内容
date: '2020-11-05'
slug: search-scanned-pdf
categories: []
tags:
  - PDF
  - regex
keywords: []
description: ''
---

扫描版的 PDF 都是图片，在里面查找内容是不可能的。所以「在扫描版 PDF 文档中查找内容」这个问题可以拆解为两部分：一是识别 PDF 中的文字，二是搜索里面的内容。

# 安装软件

开始教程之前，先安装好需要的软件：

```bash
# 安装 OCRmyPDF
sudo apt install ocrmypdf

# 安装语言支持（简繁中文、英文）
sudo apt install tesseract-ocr-eng \
tesseract-ocr-chi-sim \
tesseract-ocr-chi-sim-vert \
tesseract-ocr-chi-tra \
tesseract-ocr-chi-tra-vert

# 安装 pdftotext
sudo apt install poppler-utils

# 安装 grep
sudo apt install grep
```

# 识别文字

首先，我们要用 OCR[^ocr] 技术来识别 PDF 中的文字。有很多 OCR 软件，我用的是 [OCRmyPDF](https://github.com/jbarlow83/OCRmyPDF)。接下来用余光中译的[《老人与海》](https://book.douban.com/subject/21371496/)作为例子。

[^ocr]: Optical Character Recognition，[光学字符识别](https://zh.wikipedia.org/zh-cn/%E5%85%89%E5%AD%A6%E5%AD%97%E7%AC%A6%E8%AF%86%E5%88%AB)

1. 识别 PDF 文档中的文字

    ```bash
    ocrmypdf -l eng+chi_sim 老人与海-余光中.pdf 老人与海-余光中-ocr.pdf
    ```

2. 把识别后 PDF 转换成纯文本

    ```bash
    pdftotext 老人与海-余光中-ocr.pdf 老人与海-余光中.txt
    ```

# 搜索文字

《老人与海》第三段 `除了眼睛，他身上处处都显得苍老。可是他的眼睛跟海水一样颜色，活泼而坚定` 在 `老人与海-余光中.txt` 里面是这样的：

<!--
这句话在1827行～1830行
-->

```
除了 眼睛, 他 身上 处 处 都 显得 苍老.可 是他 的眼睛 跟 海 水一
样 颜色 , 活

涛 而 坚定 。
```

可见文字识别的效果实在不太行，不仅有错字，还有多余的空格和换行。直接搜索想找的内容肯定是不行的，但是[正则表达式](https://zh.wikipedia.org/zh-cn/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)就可以。先观察一下上面那段文字，有文字、空格和换行符，共 58 个字符。所以我们要查找带有包含文字、空格和换行的组合。

使用 egrep[^regex] 查找：

[^regex]: 如果你看不懂这条命令，就先去学习一下[正则表达式](https://zh.wikipedia.org/zh-cn/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)。这份教程（[LEARN REGEX THE EASY WAY](https://github.com/ziishaned/learn-regex)）很简洁，应该两三个小时就可以学完。学完之后再读一读 `grep` 的[手册](https://www.gnu.org/software/grep/manual/grep.html)。

```bash
egrep "[除了眼睛，他身上处处都显得苍老。可是他的眼睛跟海水一样颜色，活泼而坚定 \n]{10,}" 老人与海-余光中.txt
```

结果：

```
除了 眼睛, 他 身上 处 处 都 显得 苍老.可 是他 的眼睛 跟 海 水一
```

把结果复制到 PDF 阅读器搜索，就可以找到第三段文字了。