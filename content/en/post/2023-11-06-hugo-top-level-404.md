---
title: Create Top-Level 404 Page for a Multilingual Hugo Site
date: 2023-11-06T00:00:00+08:00
slug: hugo-top-level-404
tags:
  - Hugo
lastmod: 2023-12-07T22:24:17+08:00 # remove this line if the content is actually changed
---

If you build a multilangual Hugo site, you may want to enable `defaultContentLanguageInSubdir` to make URLs look consistent. For example:

- `/en/post/an-english-post`
- `/cn/post/a-chinese-post`

As of Hugo v0.120.4, `defaultContentLanguageInSubdir = "true"` still has the side effect that [no 404 page (404.html) is generated at the root of `public` directory](https://github.com/gohugoio/hugo/issues/5161), which causes [Cloudflare Pages to redirect non-exstent pages to root `/`](https://community.cloudflare.com/t/non-existent-page-doesnt-return-an-error-directs-to-root-page/394554). `404.html` at the root is needed to fix the problem.

There are three workarounds: reuse `404.html` in a subdirectory, create `404.md`, and create custom `404.html` in `static` directory. You don’t need these workarounds if you don’t enable `defaultContentLanguageInSubdir`.

## Reuse 404.html

Hugo generates `404.html` in each subdirectory. Copy an `404.html` to `public` directory after building. `hugo && cp public/en/404.html public` works for Cloudflare Pages, Netlify and Vercel.

Don't copy generated `404.html` to `static` directory. When `404.html` changes, you need to delete `404.html`, build the site and copy `404.html`. It's annoying to repeat these steps.

## Create 404.md

Create `404.md` in a subdirectory, such as `content/en/`. Set `url` to `/404.html`.

```markdown
---
# content/en/404.md
date: 2023-11-06T00:00:00+08:00
title: "404 Page Not Found"
url: "/404.html"
comment: false
---

[English Site](/en/) | [Chinese Site](/zh-cn/)
```

## Create custom 404.html

Create `404.html` in `static` directory. It's copied to `public` directory during building.

A minimal example:

```html
<!DOCTYPE html>
<!-- static/404.html -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 Page Not Found - Cyrus Yip's Blog</title>
  </head>
  <body>
    <h1>404 Page Not Found</h1>
    <p><a href="/en/">English Site</a> | <a href="/zh-cn/">Chinese Site</a></p>
  </body>
</html>
```

A more complicated example:

```html
<!DOCTYPE html>
<!-- static/404.html -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 Page Not Found - Cyrus Yip's Blog</title>
    <style>
      body {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        background-color: black;
        margin: 0;
      }
      .message {
        font-size: 2em;
        color: dimgray;
      }
      a {
        color: white;
      }
    </style>
  </head>
  <body>
    <p class="message">You are in darkness</p>
    <p class="link"><a href="/en/">Turn on the light</a></p>
    <p class="message">你掉入了虚空</p>
    <p class="link"><a href="/zh-cn/">离开</a></p>
  </body>
</html>
```
