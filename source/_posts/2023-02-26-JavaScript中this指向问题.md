---
title: JavaScript中this指向问题
date: 2023-02-26 14:19:57
updated: 2023-02-26 14:19:57
description: 在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了，也就是说，this的指向完全取决于函数调用的位置
categories: Java Learning
tags:
 - Java
---
在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了，也就是说，this的指向完全取决于函数调用的位置。因为this的取值是作用域环境的一部分，每次调用函数，都会在不同的作用域环境。
