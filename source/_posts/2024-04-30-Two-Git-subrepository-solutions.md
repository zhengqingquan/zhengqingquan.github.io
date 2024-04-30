---
title: 两种 Git 子仓库方案。
date: 2024-04-30 13:52:25
updated: 2024-04-30 13:52:25
description: 为了可以在项目中同步开发子仓库。可以采用两种 git 子仓库的引入方式，分别是子模块和子树。这两种方式在对于子模块的控制程度稍有有不同。
categories:
tags:
---

在开发中可能需要引入一些其他模块。引入其他模块的方式通常有两种：

1. 第一种是使用包的方式。例如 npm包、python包、java包、甚至是 C/C++ 中的库文件等。这类引入方式可以
2. 第二种是使用源码的方式（仓库）。

但如果只是单纯的将模块拷贝进来，则在某些情况下不方便开发。例如后续子仓库的版本升级、或在项目中的修改也能直接提交到子仓库中。因此希望可以直接将其他仓库内嵌到当前项目中，作为当前项目的一部分使用，但又保留了一部分与原仓库的关联。

在 Git 中子仓库的方案通常有两种：

1. 子模块：git submodule
2. 子树：git subtree

需要注意，这两种方式都是为了保持子模块与远端仓库的同步。更多是为了在主项目中也能开发子仓库，并直接提交到子仓库。而非是为了在子模块中保留一定的客制化或个性化设置的情况下，仍然可以更新子模块。

对于 `submodule` 来说，子模块中的修改若要更新到主项目中，则需要先更新并推送到子模块。

对于 `subtree` 来说，子模块中的修改，若要推送到子模块仓库中，会连带子仓库中客制化的部分一块推送。

## 一、子模块 submodule

Git子模块允许我们将一个或者多个Git仓库作为另一个Git仓库的子目录。它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

以我的博客项目为例。假设现在我的博客有自己的仓库 `githubBlog`，而博客仓库中想要使用另外一个开源的主题仓库`hexo-theme-next`作为我的子模块。为了方便后续我在开发我的博客仓库时，获取最新的 `hexo-theme-next` 仓库。如果我发现这个主题有 bug 我也可以直接提交到 `hexo-theme-next` 中。

### 添加子模块

可以使用下面命令将子仓库添加到你的父亲仓库中：

```git
git submodule add https://github.com/next-theme/hexo-theme-next themes/next
```

这个命令用于将一个 Git 仓库作为子模块添加到你的当前仓库的 `themes/next` 中。并且这一步会在`.git/config`和`.gitmodules`文件中保存了子模块的url和在主仓库目录下的映射关系。

如果你需要做某些个性化的修改，例如修改你博客仓库中的头像。这个修改是在子仓库中的进行的。

### 删除子模块

删除子模块不算复杂，但仍需要下面几个步骤。

1. 首先需要移除子模块：

```
git submodule deinit -f -- themes/hexo-theme-scallop/
```

这一步会移除子模块的内容和相关的 Git 依赖。

2. 删除残留的文件夹：

```git
git rm -f themes/hexo-theme-scallop/
```

3. 删除残留的 `.gitmodules` 文件（可选）：

```
git rm -f .gitmodules
```

这一步看个人，因为之前删除子模块的时候其中相关内容已经被删除了，如果只有这一个子模块，这就变成空文件夹了。如果有其他子模块，就不要删除这个文件。

## 二、子树 subtree

### 添加子树

当你已经有了一个仓库了。但需要添加子树。

```git
git subtree add --prefix=themes/hexo https://github.com/next-theme/hexo-theme-next.git master --squash
```

其中`--prefix=themes/hexo-theme-scallop`是指定了你要将子仓库添加到你的项目中的哪个子目录下。

`master`是子树的仓库分支。

`--squash`：这个选项表示将子仓库的所有历史记录合并成一个新的提交，并将其作为单个提交添加到你的项目中。

### 更新子树

```
git merge --allow-unrelated-histories 

git subtree pull --prefix=themes/hexo/ https://github.com/next-theme/hexo-theme-next.git master
```

出现`fatal: refusing to merge unrelated histories`错误，可以参考这个问题：[git subtree error "fatal: refusing to merge unrelated histories"](https://stackoverflow.com/questions/39281079/git-subtree-error-fatal-refusing-to-merge-unrelated-histories)。可能是因为与之前的 `git subtree add` 命令不一样。

若之前的使用了 `--squash` 参数，则更新的时候也要使用 `--squash`。

### 推送子树

```git
git subtree push --prefix=themes/hexo/ https://github.com/next-theme/hexo-theme-next.git master
```

## 三、参考

- [Git子仓库深入浅出](https://zhuanlan.zhihu.com/p/100214931)
- [Git Tools - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [Git 中submodule的使用，终于有人说明白了](https://blog.csdn.net/Java0258/article/details/108532507)
- [关于 Git 子树合并](https://docs.github.com/zh/get-started/using-git/about-git-subtree-merges)