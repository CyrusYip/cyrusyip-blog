---
title: 论文格式是人类退步的滑梯
date: 2021-04-25T00:00:00+08:00
slug: damn-dissertation-format-requirements
tags:
  - study
  - dissertation
lastmod: 2022-06-06T00:39:54+08:00 # remove this line if the content is actually changed
---

四个月前[吐槽](http://disq.us/p/2dzghw9)了毕业论文参考文献有两种样式，现在写完论文了，感觉还得再吐槽一番。写论文~~倒没有多难~~很难，但更难的是论文格式。论文格式要求真的是太害人了，不吐不快。学院给了一份 5400 字的格式规范。规定特别详细，规定了字体、行距、页边距、页眉页码、参考文献格式……为什么都写了那么长的规范，还不给份模板？难不成要学生从空白文档开始调格式吗？经过我的一番调查，其实是有模板的，但今年没有。那行吧，就拿上一届学生的论文作模板咯。但这论文格式又年年都变，拿上一届学生的来用也得调整。制定格式规范的人啊，你们这帮人到底给学生和导师挖了多少坑。难不成你们是打印店的卧底？这格式规范文件后缀名居然是 `.doc`，肯定是个祖传文件。

真是出师不利，为了避免被格式折磨到不想再写，我还是先不弄格式了。初稿是用 Typora 写的，在干净的界面上写论文真是如沐春风。写完之后就要把内容迁移到 Word 文档了。多亏女友调好了她论文的格式，我就直接拿她的作模板了。要是没女友相助，我估计直接去第二次答辩了，真是万分感谢。把内容一点一点地粘贴到 Word 文档里面。光是这件事就花了我两三个小时，一边粘贴一边爆粗。

除了要应付繁杂的格式要求，还要担心踩到好心人挖的坑里。有同学在专业群问查重的问题，辅导员就建议直接把文本粘贴到维普网页上，或者上传 PDF。但论文是用 Word 写的，直接复制内容或者上传 PDF 可能会导致维普检测把不该查重的部分也查了。学校就只提供两次查重机会，学校只认这两次的结果。要是上传了错误的文档就浪费了一次宝贵的机会。幸亏维普对粘贴到网页的内容有字数限制，不然同学要中招了。还有同学发了模板，我的火眼金睛看到一句重要的话——「模板不能涵盖所有情况，请参考『附录一 格式规范』。可今年的格式规范是「附录二」，所以这个模板不是今年的。根据上面写的班级，应该是去年的模板。有的同学就更厉害了，发了前年的模板。要不是我头脑清醒，早就被害惨了。

那些纠结细节的同学也很可怕，他们会在群里问没规定的格式怎么弄。比如标题下面要不要加空行，页眉的校徽的位置和大小怎么设置。我觉得格式问题真的没那么复杂，首先遵守学院的格式要求，没规定的格式就参照上一届学生的论文。可靠的信息来源就两个：格式规范、学院老师的答复。辅导员和同学的答复都不见得可靠。这些同学在群里问一问还没什么，就怕他们去问学院的老师。不问就不是问题，问了就成了问题。希望大家能好好分辨信息的可靠性，不要见风是雨，搞得人心惶惶的。

吐槽了那么多，我也在想怎么解决论文格式这个大难题。我觉得写作应该遵循「[内容与样式分离](https://zh.wikipedia.org/wiki/%E5%91%88%E7%8E%B0%E4%B8%8E%E5%86%85%E5%AE%B9%E5%88%86%E7%A6%BB)」。什么是内容与样式分离？举个例子，论文的一级标题格式是居中加粗四号宋体，我现在要写两个标题，分别是「翻译过程」和「案例分析」。

「内容与样式分离」的做法是这样的：

1. 设置「标题 1」样式
    1. 居中
    1. 加粗
    1. 四号
    1. 宋体
1. 输入「翻译过程」
1. 把「翻译过程」设置为「标题 1」
1. 输入「案例分析」
1. 把「案例分析」设置为「标题 1」

「内容与样式不分离」的做法是这样的：

1. 输入「翻译过程」
1. 设置「翻译过程」的格式
    1. 居中
    1. 加粗
    1. 四号
    1. 宋体
1. 输入「案例分析」
1. 设置「案例分析」的格式
    1. 居中
    1. 加粗
    1. 四号
    1. 宋体

感受到两者的差距了吗？「内容与样式分离」会减少重复劳动。「内容与样式分离」就是定义样式，再把样式应用于内容，这样就不需要写一个标题就调一次格式。在毕业论文这件事上，我觉得可以用文档转换器 pandoc 来实现「内容与样式分离」。

1. 新建一个模板文档（template.docx）

    ```bash
    pandoc -o template.docx --print-default-data-file reference.docx
    ```

2. 把模板的「标题 1」的样式设置为「居中加粗四号宋体」

3. 新建一个空白文档（input.docx）

4. 在空白文档填写「翻译过程」，并将其设置为「标题 1」。

5. 把模板的「标题 1」样式应用于空白文档。

```bash
pandoc input.docx -o output.docx --reference-doc template.docx
```

现在打开输出文档（output.docx），你会发现「翻译过程」已经变成了「居中加粗四号宋体」。

铺垫了那么多，终于要说解决格式问题的办法了。学院负责制作模板，打包 pandoc 和转换文档的脚本。学生只管写，写完后打开脚本让 pandoc 负责排版。这样学生和导师都可以关注于内容，而不是纠结格式，甚至还可以用 Markdown 写论文。

其实我觉得写论文还是用 R Markdown 最省心。理科生要输入数学公式，所以会用 LaTeX，那再迁移到 R Markdown 也不是难事。可我们文科生好像没有必须不用 Word 的理由，估计还得在 Word 的泥潭里躺一万年。

