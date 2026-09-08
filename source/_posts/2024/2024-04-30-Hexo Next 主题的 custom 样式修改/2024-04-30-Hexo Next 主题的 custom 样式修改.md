---
title: Hexo Next 主题的 custom 样式修改
date: 2024-04-30 17:25:04
updated: 2024-05-11 09:32:16
description: 本文介绍如何通过 Next 主题的 custom 文件修改变量样式，并以标签云颜色为例说明。基于 Hexo 7.2.0 和 NexT version 8.19.2。
categories: Blog Summary
tags:
 - Blog
 - Hexo
 - Hexo-theme-Next
permalink: posts/1b1144219226.html
---
next支持custom.styl

以修改标签Tagcloud Color颜色为例

在站点根目录中创建和编辑 source/_data/variables.styl 并添加变量：

```styl
$tag-cloud-start      = #aaa;
$tag-cloud-end        = #111;
$tag-cloud-start-dark = #555;
$tag-cloud-end-dark   = #eee;
```

## 参考

- [Next | Examples of Modifying Style](https://theme-next.js.org/docs/advanced-settings/custom-files)
