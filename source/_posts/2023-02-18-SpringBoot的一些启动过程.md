---
title: SpringBoot的一些启动过程
date: 2023-02-18 00:00:00
updated: 2023-02-18 00:00:00
description: SpringBoot的一些启动过程 在SpringBoot的启动类上有个注解叫@SpringBootApplication这个注解会让Spring去扫描被@SpringBootApplication修…
categories: Java Learning
tags:
 - Java
 - Spring
---

### SpringBoot的一些启动过程

在SpringBoot的启动类上有个注解叫@SpringBootApplication这个注解会让Spring去扫描被@SpringBootApplication修饰的类的文件夹中的Bean。

也就是说，如果被@SpringBootApplication修饰的启动类叫MyApplication，这个MyApplication如果在项目文件夹例如/com.demo，那Spring就会去扫描/com.demo路径下的所有Bean。

这个扫描发现Bean的方式有几种，在SpringBoot中可以用@Configration和@Bean来修饰一个类当作Bean。如果被扫描的类不在/com.demo中，那@SpringBootApplication就没法自动扫描到对应的Bean，只能通过其它方式来加载Bean。

如果Spring扫描不到配置类或Bean，那后续也谈不上使用Bean了。你无法去使用一个不存在的东西。

SpringBoot启动的时候，如果你的包导入了org.springframework.book:spring-boot-autocofigure，则会来解析包中的META-INF下的spring.factories。只要这个路径下有这个文件，那么SpringBoot会解析出你有哪些自动配置类。这些配置类不用被Spring扫描到就可以直接使用。

如果你的项目路径下有META-INF，也有spring.factories，并且格式保持一致，那就不需要在配置类上添加@Configration注解，这个类就可以被Spring解析到。这是SpringBoot的特性。

这个特性怎么来的，就是SpringBoot需要去支持一些我们程序扫描不到的位置的类。比如有些在包中的类，SpringBoot需要用到，但我们的程序@Configraion扫描不到，那就得使用这种类似开后门的方式使用配置文件的方式让SpringBoot直接去解析使用。
