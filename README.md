# Cyrus Yip's Blog

This is Cyrus Yip's personal website. The [content of all pages](content) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), other files are licensed under [MIT](LICENSE.md).

## Usage

The minimal requirement is Git and Hugo.

```bash
# Clone this repo with its submodule.
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
# Preview
cd cyrusyip-blog
hugo server
```

---

I use pnpm to manage Hugo version, and [estruyf/vscode-front-matter](https://github.com/estruyf/vscode-front-matter) to manage content.


```bash
# Clone this repo with its submodule.
git clone --recursive git@github.com:CyrusYip/cyrusyip-blog.git
# git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git

# Install Hugo
cd cyrusyip-blog
pnpm install # Use --force flag when postinstall script is not running

# Preview
pnpm run server

# Build
pnpm run build
```

## Contributing Guidelines

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Note

- Before 2024-03-13, the date in `/content/**/*.md` indicates when I start writing an article (usually unfinished). After 2024-03-13, the date in `/content/**/*.md` indicates when I finish the first draft, which will undergo multiple edits. `T00:00:00` means the exact time is unknown, and only date part (e.g. 2022-06-30) is correct.
