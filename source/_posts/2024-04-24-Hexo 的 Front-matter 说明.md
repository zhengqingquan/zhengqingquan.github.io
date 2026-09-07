---
title: Hexo 的 Front-matter 说明
date: 2024-04-24 15:08:58
updated: 2024-04-24 15:09:19
description: 本文整理 Hexo Front-matter 相关说明与官方文档入口。基于 Hexo 7.2.0。
categories: Blog Summary
tags:
 - Blog
 - Hexo
---

Front-matter 是文章（或页面）开头的一段 YAML / JSON 配置，用来声明标题、时间、分类、标签等元数据。YAML 形式以 `---` 包裹，例如：

```yaml
---
title: 文章标题
date: 2024-04-24 15:08:58
updated: 2024-04-24 15:09:19
categories: Blog Summary
tags:
 - Blog
 - Hexo
---
```

常用字段：

| 字段 | 说明 |
|------|------|
| `title` | 文章标题 |
| `date` | 创建 / 发布时间 |
| `updated` | 更新时间 |
| `categories` | 分类（仅文章） |
| `tags` | 标签（仅文章） |
| `permalink` | 覆盖默认永久链接，需以 `/` 或 `.html` 结尾 |
| `layout` | 布局，默认一般为 `post` |
| `comments` | 是否开启评论 |

分类可写成层级；标签同级，顺序不重要。更完整的字段说明与多级分类示例见下方参考。

时间相关配置（如未写 `updated` 时如何取值）还可结合站点 `_config.yml` 里的 `updated_option` 一起看。

## 参考

1. [Hexo的Front-matter](https://hexo.io/zh-cn/docs/front-matter)
