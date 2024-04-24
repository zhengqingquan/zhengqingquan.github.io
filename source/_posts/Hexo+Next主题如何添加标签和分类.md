---
title: hexo+next主题如何添加标签和分类
categories: Blog Summary
tags:
 - Blog
 - Hexo
 - Hexo-theme-Next
---

如果在Hexo中遇到下面这个问题：

```
Cannot GET /tags/
```

那可能是没创建标签相关的页面。

---

以Hexo+Next为例，创建标签页面很简单，只有四步：

1. 创建对应的页面。
2. 修改页面的`Front-matter`属性。
3. 新增Next主题的菜单入口。
4. 在文章中添加对应的`Front-matter`属性。

下面我先以`标签（tags）`页面为例，`分类（categories）`页面同理。

## 一、创建对应的页面

使用下面命令创建一个标签页面：

```npm
hexo new page tags
```

默认设置的情况下，会在路径`source\tags\index.md`创建出`index.md`文件：

## 二、修改页面的`Front-matter`属性

刚才创建出来的文件是这样的，默认会给一个标题`title`和创建文件的时间`date`：

```
# source\tags\index.md
---
title: tags
date: 2024-04-24 15:17:51
---
```

在`Front-matter`中，我删掉了时间（因为用不到），并添加额外的属性`type`：

```
# source\tags\index.md
---
title: tags
type: "tags"
---
```

## 三、新增Next主题的菜单入口。

如果不是使用Next主题的，可以掠过这步。这步其实是在Next主题下，可以新增一个标签的菜单入口。

如果博客使用的是Next主题，可以在主题配置文件中打开以下属性：

```yml
# themes\scallop\_config.yml
menu:
  tags: /tags/ || fa fa-tags
```

后续就可以看到Next主题提供的标签菜单入口了。

## 四、在文章中添加对应的`Front-matter`属性

在文章中新增代表标签的`tags`属性，分类`categories`同理：

```
source\_posts\hello-world.md

---
title: Hello World
categories: 日常总结
tags:
 - MySQL
 - 数据库
---
```

## 总结

至此，完成上面四步，博客的标签功能就算搭好了。分类功能也是类似的修改。

若是要创建分类页面则第一步执行的是下面命令：

```npm
hexo new page categories
```

后续步骤也是做出相似的修改即可。

---

## 题外话

标签相对好理解，标签与标签之间都是相对独立的。并没有`A标签属于B标签`，或者`B标签是A标签的一部分`这种说法。

但分类和标签并不一样。例如某一篇文章属于日记这个分类，并且有PS3和Games标签：

```
categories:
 - Diary
tags:
 - PS3
 - Games
```

并且对于Hexo来说，不支持指定多个同级分类：

```
categories:
  - Diary
  - Life
```

上面这样的分类代表：**Life 是 Diary 的一部分**。也就是说 Life 成为了 Diary 的子分类，而不是并列分类。

如果你需要为文章添加多个分类，可以尝试以下方法：

```
categories:
 - [Diary, PlayStation]
 - [Diary, Games]
 - [Life]
```

这样的属性代表这篇文章同时包括三个分类。PlayStation 和 Games 分别都是父分类 Diary 的子分类。而同时 Life 是一个没有子分类的分类。

## 参考

1. [Hexo 分类和标签](https://hexo.io/zh-cn/docs/front-matter#%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE)
2. [hexo 下的分类和表签无法显示并出现Cannot GET /tags](https://blog.csdn.net/weixin_40796433/article/details/121976180)
3. [Hexo新建标签、分类、归档等页面](https://blog.csdn.net/weixin_41287260/article/details/97758641)