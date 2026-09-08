---
title: ArrayList扩容机制
date: 2023-03-08 15:46:03
updated: 2023-03-08 15:46:04
description: 最开始的 ArrayList 会创建长度为0的数组
categories: Java Learning
tags:
 - Java
permalink: posts/6a6f62286bd7.html
---
最开始的`ArrayList()`会创建长度为0的数组。

如果指定了长度`ArrayList(num)`会创建指定长度的数组。

如果使用了集合作为参数`ArrayList(Collection)`那么会使用集合的大小作为初始容量。

* * *

往ArrayList中添加元素有两种方式，一种是`ArrayList.add()`另一种是`ArrayList.addAll()`。

* * *

对于`ArrayList.add()`来说，往数组里添加第一个元素时，会发现容量不够了，因为发现容量是0，这时就进行第一次扩容。首次扩容为10。

默认扩容是上一次容量的1.5倍。其实1.5倍也不是很准确，它是根据数组的长度进行移位来确定扩容倍速的。比如数组长度为15，0000 1111，>>移位后0000 0111，为7.然后再加上原始容量15，得到22。

对于`ArrayList.addAll()`来说，第一次扩容会扩容成10。当添加的元素超过10时，第一次扩容会扩容成添加元素个数的值（比如添加11个元素，第一次扩容就会扩容成11）。

用addAll，当原始容量不够时，会将默认长度（10）和添加元素个数进行比较，两者取最大值作为扩容长度。

* * *

```
/**
 * Default initial capacity.
 */
private static final int DEFAULT_CAPACITY = 10;
```

上面的代码是在源码中的，表示默认容量是10。
