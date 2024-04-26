---
title: 给 Hexo 博客文章添加字数统计和阅读时长
date: 2024-04-26 09:17:51
updated: 2024-04-26 09:17:51
description: 本文介绍如何给 Hexo 博客文章添加本文字数和阅读时长，并说明其中各个配置项的作用。基于 Hexo 7.2.0 和 NexT version 8.19.2。
categories: Blog Summary
tags:
 - Blog
 - Hexo
 - Hexo-theme-Next
---

Hexo 已经将相关配置集成进了进去，只要安装对应插件，并进行设置即可。

## 安装对应的包

使用下面命令安装对应的包：

```bash
npm install hexo-word-counter
```

若没有包，后续的设置是没有效果的。

需要注意，启用此功能后，需要清理 Hexo 项目生成的缓存文件和静态文件，并重新生成静态文件。否则站点总字数和站点阅读时长无法正确显示（例如显示 undefined 或 NaN ）：

```bash
hexo clean
hexo generate
```

## 修改配置

### Hexo 配置

若未使用任何主题，可以直接在 Hexo 的配置文件中添加下面修改：

```yml
# _config.yml

symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
  exclude_codeblock: false
  awl: 4
  wpm: 275
  suffix: "mins."
```

参数含义如下：

1. `symbols`：是否开启本文字数。
2. `time`：是否开启阅读时长。
3. `total_symbols`: 是否开启站点总字数。
4. `exclude_codeblock`：允许排除代码块内的所有内容，以便更准确地进行字数统计。
5. `awl`：平均单词长度（单词中字符的计数）。默认值：4。
    1. CN ≈ 2
    2. EN ≈ 5
    3. RU ≈ 6
6. `wpm`：每分钟单词数。默认值：275。
    1. Slow ≈ 200
    2. Normal ≈ 275
    3. Fast ≈ 350
7. `suffix`：如果阅读时间少于60分钟，则添加后缀作为字符串参数。

### Next 主题配置

若使用了 Next 主题，同样可以对 Hexo 的配置进行设置，两者并不冲突。只是 Next 提供了额外的设置。可以在主题配置文件 `_config.yml` 中可以找到下面设置：

```yml
# themes\next\_config.yml

# Post meta display settings
post_meta:
  item_text: true

# Post wordcount display settings
# Dependencies: https://github.com/next-theme/hexo-word-counter
symbols_count_time:
  separated_meta: true
  item_text_total: false
```

参数含义如下：

1. `item_text`：本文字数和阅读时长，是否使用文本展示。若为 false 则仅展示图标。
2. `separated_meta`：是否换行显示本文字数及阅读时长。
3. `item_text_total`：站点总字数和站点阅读时长，是否使用文本展示。若为 false 则仅展示图标。

## 卸载此功能

卸载对应的包即可：

```bash
npm uninstall hexo-word-counter
```

## 参考

1. [Github-Hexo Word Counter](https://github.com/next-theme/hexo-word-counter)
2. [Next-Post Wordcount](https://theme-next.js.org/docs/theme-settings/posts#Post-Wordcount)
3. [Hexo-Next-字数统计](https://hexo-next.readthedocs.io/zh-cn/latest/next/advanced/%E5%AD%97%E6%95%B0%E7%BB%9F%E8%AE%A1/)