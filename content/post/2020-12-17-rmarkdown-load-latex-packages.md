---
title: 在 Rmarkdown 中加载 Latex 宏包
date: '2020-12-17'
slug: rmarkdown-load-latex-packages
tags:
  - Markdown
  - Rmarkdown
  - LaTeX
---

# extra_dependencies

```
---
output: 
  pdf_document:
    extra_dependencies: ["bbm", "threeparttable"]
---
```

<!--more-->

```
---
output: 
  pdf_document:
    extra_dependencies:
      caption: ["labelfont={bf}"]
      hyperref: ["unicode=true", "breaklinks=true"]
      lmodern: null
---
```

# header-includes

```
---
header-includes:
   - \usepackage{bbm}
output:
    pdf_document
---
```

# in-header

```
---
output:
    pdf_document:
        includes:
            in_header: mystyles.sty
---
```

```
% mystyles.sty
\usepackage{bbm}
\usepackage{threeparttable}
\usepackage{booktabs}
\usepackage{expex}
```

# 参考资料

- [6.4 Include additional LaTeX packages | R Markdown Cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/latex-extra.html)
- [knitr - How to include LaTeX package in R Markdown? - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/171711/how-to-include-latex-package-in-r-markdown)