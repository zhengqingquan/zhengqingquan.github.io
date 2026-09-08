# 个人博客

## 基础

🌐 **Website**: [https://zhengqingquan.github.io](https://zhengqingquan.github.io)

- **框架**：Hexo（站点配置 `_config.yml`，内容在 `source/`）
- **主题**：官方 [NexT](https://github.com/next-theme/hexo-theme-next)，目录 `themes/next`（非 npm 依赖；可用 remote `next` 拉取更新，见下文）
- **部署**：推送 `main` 后由 GitHub Actions 构建并发布到 GitHub Pages

## 环境

```
Git
Node.js v22.17.0
```

## Node 包依赖

```
hexo v7.3.0
```

## 使用方法

在仓库根目录执行。

### 安装依赖

```bash
npm install
```

### 本地预览

```bash
npm run server
# 等价：npx hexo server  /  hexo s
# 默认地址：http://localhost:4000/
```

### 生成静态站点

```bash
npm run build
# 等价：npx hexo generate  /  hexo g
# 输出目录：public/
```

### 清理缓存与生成物

```bash
npm run clean
# 等价：npx hexo clean
```

### 新建文章

```bash
npx hexo new "文章标题" --path=2026/文章标题/文章标题.md
# 生成：source/_posts/<年>/<标题>/<标题>.md
# 同目录可放 image/ 等资源；post_asset_folder: true 时还可能多出一个空的同名子目录，无资源可删
# 模板：scaffolds/post.md（含 title / date / updated / description / categories / tags）
```

文章按年放在 `source/_posts/YYYY/`，每篇为「同名目录 + 同名 md」：

```text
source/_posts/2023/2023-12-21-面向对象编程基础/
  2023-12-21-面向对象编程基础.md
  image/
    继承.svg
```

（依赖根目录 `scripts/index-post-assets.js`：Hexo 原生会把资源夹认成与 md 同名的子目录，该脚本改为发布与 `.md` 同级的资源。）

正文可写相对路径（本地预览友好）：

```html
<img src="image/继承.svg" alt="说明">
```

生成时 `scripts/rewrite-relative-post-assets.js` 会把上述相对路径展开为 `/posts/<hash>/image/...`，因此 `permalink` 请保持与全站一致的 `posts/<hash>.html`（不要改成目录形式，否则搜索/旧链接会对不上）。也可使用 `{% asset_img image/继承.svg %}`。永久链接写在 Front-matter 的 `permalink`（hash 或个别英文 slug），挪目录不影响外链。Front-matter 说明可参考站内相关博文或 [Hexo Front-matter](https://hexo.io/zh-cn/docs/front-matter)。

### 部署

向 `origin` 的 `main` 分支推送后，工作流 `.github/workflows/pages.yml` 会自动：

1. `npm install`
2. `npm run build`
3. 将 `public/` 部署到 GitHub Pages

本地一般无需执行 `npm run deploy`（当前 `_config.yml` 中 `deploy.type` 为空，站点靠 Actions 发布）。

### 更新 NexT 主题（可选）

仓库已配置 remote `next` → [hexo-theme-next](https://github.com/next-theme/hexo-theme-next)。需要升级主题时，从该 remote 拉取后再合并进 `themes/next`，并自行核对主题 `_config.yml` 与站点配置是否兼容。
