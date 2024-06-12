# Cyrus Yip's Blog

This is Cyrus Yip's personal website. The content of all pages is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Usage

The minimal requirement is Git and Hugo.

```bash
# Clone this repo with its submodule.
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
# Preview
cd cyrusyip-blog
hugo server
```

I use npm to manage Hugo version, and [estruyf/vscode-front-matter](https://github.com/estruyf/vscode-front-matter) to manage content.


```bash
# Clone this repo with its submodule.
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
# git clone --recursive git@github.com:CyrusYip/cyrusyip-blog.git

# Install Hugo
cd cyrusyip-blog
npm install

# Preview
npm run dev

# Build
npm run build
```

<!---
Actually, I use additional tools to manage Hugo and blogdown.

```bash
# Clone this repo with its submodule.
git clone --recursive https://github.com/CyrusYip/cyrusyip-blog.git
# git clone --recursive git@github.com:CyrusYip/cyrusyip-blog.git

# Install dependencies
cd cyrusyip-blog
npm install
conda env create -f environment.yml

# Activate blogdown environment
conda activate blogdown

# Create a post via blogdown
./new-post.sh

# Deactivate the environment
conda deactivate

# Preview
npx hugo server --navigateToChanged
```

Besides using command line, you can also preview this site with [RStudio](https://www.rstudio.com/products/rstudio/) or VS Code with [R extension](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r).

You can find the Hugo version that I use in [.Rprofile](.Rprofile).

```
# .Rprofile
blogdown.hugo.version = "x.xx.x"
```
-->
## Contributing Guidelines

See [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Note

- When Hugo version is upgraded, [package.json](package.json), [vercel.json](vercel.json), [netlify.toml](netlify.toml) and [.Rprofile](.Rprofile) should be modified accordingly.
- When [config.toml](config.toml) is modified, run `./apply-no-comments-patch`.
