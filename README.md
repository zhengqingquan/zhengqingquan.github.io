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
npx hexo new "文章标题"
# 生成：source/_posts/<标题>.md
# 模板：scaffolds/post.md（含 title / date / updated / description / categories / tags）
```

文章写在 `source/_posts/`；Front-matter 说明可参考站内相关博文或 [Hexo Front-matter](https://hexo.io/zh-cn/docs/front-matter)。

### 部署

向 `origin` 的 `main` 分支推送后，工作流 `.github/workflows/pages.yml` 会自动：

1. `npm install`
2. `npm run build`
3. 将 `public/` 部署到 GitHub Pages

本地一般无需执行 `npm run deploy`（当前 `_config.yml` 中 `deploy.type` 为空，站点靠 Actions 发布）。

### 更新 NexT 主题（可选）

仓库已配置 remote `next` → [hexo-theme-next](https://github.com/next-theme/hexo-theme-next)。需要升级主题时，从该 remote 拉取后再合并进 `themes/next`，并自行核对主题 `_config.yml` 与站点配置是否兼容。
