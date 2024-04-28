---
title: 如何正确配置 Hexo 的主题。
date: 2024-04-28 14:25:04
updated: 2024-04-28 14:25:04
description: 本文以 Next 为例，介绍如何正确配置自己想要的 Hexo 主题。并使用相对独立地配置个性化主题。基于 Hexo 7.2.0 和 NexT version 8.19.2。
categories: Blog Summary
tags:
 - Blog
 - Hexo
 - Hexo-theme-Next
---

## 一、下载 Next 主题

首先可以去寻找自己想要的主题，例如官网：[Themes | Hexo](https://hexo.io/themes/)

这里以 Hexo 的 Next 主题为例。从 Next 的 [仓库](https://github.com/next-theme/hexo-theme-next) 和 [文档](https://theme-next.js.org/docs/getting-started/installation) 中可以了解到有两种方式可以安装。

一种是使用 npm 进行安装：

```bash
cd hexo-site
npm install hexo-theme-next
```

另一种是使用 git 进行安装：

```
git clone https://github.com/next-theme/hexo-theme-next themes/next
```

选择其中一种即可。执行上面的命令后和主题相关的文件会被下载到当前目录下的 `node_modules/hexo-theme-next` 或 `themes\next` 中。

## 二、修改博客主题为 Next

Hexo 中默认的主题是 `landscape`，现在更换为 Next 。

这一步需要修改博客配置为`next`，也就是修改当前目录下的`_config.yml`文件。

```yml
# _config.yml

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next
```

修改完成后清空静态文件和缓存，重新生成站点即可：

```bash
hexo clean
hexo g
hexo s
```

## 三、配置个性化主题

对于配置个性化主题，传统的方法是直接编辑主题中的配置文件（例如，`themes/next/_config.yml` 或 `node_modules/hexo-theme-next/_config.yml`）。

但这种方法如果更新了主题，会直接把其中的配置也一并覆盖掉。在主题升级的时候非常麻烦。

因此 Next 提供了两种配置主题的方法，分别是 `使用备用主题配置` 和 `使用 Hexo 配置文件`，选择其中一种方法即可。

### 使用备用主题配置

通常，Next 的主题默认配置文件都是放在主题的文件夹中的 `_config.yml`。而现在可以创建一个新的配置文件来代替默认的配置文件。

1. 该功能要确保使用的是 `Hexo 5.0` 或更高版本。
2. 在网站的根目录下创建文件 `_config.next.yml`。该文件中间的名字与主题配置文件中的`theme`选项值名字保持一致。
3. 将所需的 NexT 主题选项从默认主题配置文件复制到此配置文件中。可以将其中的整个内容拷贝过来进行配置，也可以根据需要单独复制。
4. 修改成你自己需要配置。

修改配置文件的时候但仍然需要保持文件的缩进。

### 使用 Hexo 配置文件

可以将主题配置直接写在 Hexo 的博客配置中：

1. 在博客配置 `_config.yml` 中添加 `theme_config` 参数。
2. 将主题的配置 `themes/next/_config.yml` 复制到 `theme_config` 参数下面。添加的时候需要注意将内容向后缩进两个空格（可以使用`Ctrl + ]` 键）。

添加完成后，重新清除缓存和静态文件，生成站点即可。

## 四、参考

- [Github | hexo-theme-next](https://github.com/next-theme/hexo-theme-next)
- [Next | installation](https://theme-next.js.org/docs/getting-started/installation)
- [Next | Configuration](https://theme-next.js.org/docs/getting-started/configuration.html)
- [Next | Custom Files](https://theme-next.js.org/docs/advanced-settings/custom-files.html)