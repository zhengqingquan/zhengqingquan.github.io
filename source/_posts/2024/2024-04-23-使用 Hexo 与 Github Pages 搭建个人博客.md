---
title: 使用 Hexo 与 Github Pages 搭建个人博客
date: 2024-04-23 13:17:54
updated: 2024-04-25 14:21:22
description: 本文介绍使用 Hexo 博客框架搭配 Github Pages 搭建个人博客的环境、初始化与部署步骤。基于 Hexo 7.2.0。
categories: Blog Summary
tags:
 - Blog
 - Hexo
 - Github-Pages
permalink: posts/2e958e7ba392.html
---
# 使用Hexo + Github pages搭建个人博客

---

本文在于介绍使用Hexo博客框架搭配Github pages的方式如何实现博客的搭建。

---

## 环境

```
node.js
git
```

---

## 搭建

1. 使用 npm 安装 Hexo。这一步是安装 Hexo 框架。

```bash
npm install -g hexo-cli
```

2. 安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。这一步是为了初始化博客工程。

```bash
hexo init <folder>
```

若创建的文件夹不是空的会出现下面报错：

> FATAL G:\file not empty, please run \`hexo init\` on an empty folder and then copy your files into it

3. 建立与github的关系。这一步是为了将博客工程上传到github仓库进行管理。

这一步有两种方式。

第一种方式，可以先clone github的仓库，再将第二步创建的所有文件复制到其中。最后提交。

第二种方式，可以直接在刚才初始化博客工程的文件夹中创建git仓库，再跟github的仓库关联起来。

4. 使用github actions工作流部署博客。

这一步需要干两件事，第一件事是提交工作流文件。第二件事是修改仓库设置，将设置改为github actions

这部分可以可以参考：
[在 GitHub Pages 上部署 Hexo](https://hexo.io/zh-cn/docs/github-pages)
[GitHub Actions 文档](https://docs.github.com/zh/actions)

---

至此就算是搭建好了。

---

## 参考

1. [Hexo 文档-概述](https://hexo.io/zh-cn/docs/index.html)
2. [Hexo 文档-建站](https://hexo.io/zh-cn/docs/setup)
3. [【Hexo自动部署】优雅的使用 Github Actions 进行 Hexo 静态博客的持续集成与部署](https://cloud.tencent.com/developer/article/2369534)
