---
title: String、StringBuffer、StringBuilder这三者的区别。
date: 2023-03-29 13:55:42
updated: 2023-03-29 13:55:42
description: 在Java中有两种字符串的处理方式： - 第一种是不可变的方式：String - 第二种是可变的方式：StringBuffer、StringBuilder String对象一旦被创建，就不可修改，任何…
categories: Java Learning
tags:
 - Java
---
在Java中有两种字符串的处理方式：

- 第一种是不可变的方式：String

- 第二种是可变的方式：StringBuffer、StringBuilder

String对象一旦被创建，就不可修改，任何的字符串操作都会返回一个新的String对象，这可能导致频繁的对象创建和销毁，影响性能。

StringBuffer和StringBuilder允许进行修改操作，提供了一种更高效的字符串处理方式。

由于String的不可变性，因此天生具备**线程安全**，可以在多个线程中安全使用。

* * *

而StringBuffer和StringBuilder的主要区别在于线程安全性和性能方面。

StringBuffer是**线程安全**的，所有方法都是同步的（底层实现加了synchronize关键字），因此可以被多个线程同时访问和修改。

StringBuilder是**线程不安全**的，适用于单线程环境下的字符串处理，但性能比StringBuffer更高。

* * *

因此当字符串处理不需要修改时，可以使用String；当字符串需要频繁修改时，建议使用StringBuffer或Stringbuilder

* * *

String类型是存储在字符串常量空间里的。

StringBuffer存储在堆内存里。

StringBuilder存储在堆内存里。
