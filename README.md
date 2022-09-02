# Cyrus Yip's Blog

This is Cyrus Yip's personal website. The content of all pages is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Preview locally

Clone this repo with its submodule.

```bash
# HTTPS
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
# SSH
git clone --recursive git@github.com:CyrusYip/cyrusyip-blog.git
```

Run the site with blogdown(recommended) or Hugo.

```r
# R console
blogdown:::serve_site()
```

```bash
# hugo
hugo server --navigateToChanged --buildDrafts
```

Besides using command line, you can also preview this site with [RStudio](https://www.rstudio.com/products/rstudio/) or VS Code with [R extension](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r).

You can find the Hugo version that I use in [.Rprofile](.Rprofile) and [vercel.json](vercel.json).

```
# .Rprofile
blogdown.hugo.version = "x.xx.x"
# vercel.json
"HUGO_VERSION": "x.xx.x"
```

## Contributing Guidelines

First off, thank you for considering contributing to this project. Any help would be much appreciated.

Please feel free to improve the quality of this content by submitting pull requests. A merged PR will make you appear in the contributor list. It will, however, be considered a donation of your work to this project. You are still bound by the conditions of the license, meaning that you are not considered an author or owner of the content once it has been merged in.

You may also open issues for pointing out mistakes or suggesting ideas.
