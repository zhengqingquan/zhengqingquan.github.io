---
title: "Spring框架中Bean有哪几个生命周期？"
date: 2023-03-17 15:31:41
updated: 2023-03-17 15:31:41
description: 在生物学中，生命周期指的是从一个生物体开始生长、繁殖到死亡的全过程
categories: Java Learning
tags:
 - Java
permalink: posts/216b9cb5c939.html
---
在生物学中，生命周期指的是从一个生物体开始生长、繁殖到死亡的全过程。

在计算机中，生命周期是指一个对象从创建（或者获取）到销毁的整个过程。

例如，人类的生命周期从胚胎时期开始，随着不断的发育成长，逐渐进入成年期，然后经历一段时间的繁殖期，最终经历老年期和死亡。在繁殖期如果有新的胚胎产生，那就是这个胚胎的生命周期。

在这里生命周期指的是某个具体的人类，在计算机中指的是某个具体的对象。当然，抽象起来就是全部的人类物种都遵循这样的生命周期，而全部的Spring中的Bean都遵循这样的生命周期。

* * *

### 从实例化到销毁。

在 Spring 框架中，Bean 的生命周期通常包括以下五个阶段：

1. 实例化（Instantiation）：在这个阶段，Spring 将根据配置文件或注解等方式创建 Bean 实例，并将其存储在容器中。

3. 属性赋值（Populate Properties）：在这个阶段，Spring 将会自动将 Bean 的属性值从配置文件或注解等方式中注入到 Bean 实例中。

5. 初始化（Initialization）：在这个阶段，Spring 会调用 Bean 实例的 init-method 方法，完成一些初始化的操作，例如建立数据库连接等。

7. 使用（In Use）：在这个阶段，Bean 实例已经可以正常使用，供应用程序调用。

9. 销毁（Destruction）：在这个阶段，Spring 会调用 Bean 实例的 destroy-method 方法，完成一些资源的释放和清理操作，例如关闭数据库连接等。

当加入了 Bean 的后置处理器后，IOC 容器中 bean 的生命周期分为七个阶段，也就是在初始化的前后加上特定的处理器：

- BeanPostProcessor 的前置处理：当属性注入完成后，Spring 会调用所有实现了 BeanPostProcessor 接口的类的postProcessBeforeInitialization 方法，可以在这个方法中对 Bean 进行一些自定义的初始化操作。

- BeanPostProcessor 的后置处理：当 Bean 的初始化完成后，Spring 会调用所有实现了 BeanPostProcessor 接口的类的postProcessAfterInitialization 方法，可以在这个方法中对 Bean 进行一些自定义的后续处理。

* * *

### 容器启动阶段

`BeanDefinitionReader`读取`Bean`的配置信息（如XML等）。将读取到每个`Bean`的配置信息使用`BeanDefinition`表示，同时注册到相应的`BeanDefinitionRegistry`中。
